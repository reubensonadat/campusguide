import { supabase } from '../lib/supabase';
import { getCurrentUser } from './authService';

// --- WHISPERS ---

export const getWhispers = async () => {
    try {
        const { data, error } = await supabase
            .from('campus_whispers')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching whispers:', error);
        return { success: false, error: error.message };
    }
};

// ============================================================
// PROFANITY FILTER — Hardcoded list for instant, zero-cost checks
// This catches clear-cut cases BEFORE calling the AI.
// The AI handles nuance, context, and filter bypass attempts.
// ============================================================
const BAD_WORDS = [
    // === ENGLISH: Core profanities & creative spellings ===
    'fuck', 'fucker', 'fucking', 'fucked', 'fck', 'f*ck', 'fuk', 'fukk',
    'motherfucker', 'muthafucka', 'mofo',
    'shit', 'bullshit', 'horseshit', 'shitty', 'sh1t', 'sh!t',
    'bitch', 'b!tch', 'b1tch', 'bitches', 'bitching', 'sonofabitch',
    'ass', 'asshole', '@ss', 'a$$', 'dumbass', 'jackass',
    'dick', 'dickhead', 'd1ck', 'cock', 'c0ck', 'cocksucker', 'prick',
    'pussy', 'p*ssy', 'cunt', 'c*nt', 'twat', 'snatch',
    'whore', 'slut', 'sl*t', 'hooker', 'tramp', 'skank',
    'nigger', 'nigga', 'n1gga', 'n*gga', 'faggot', 'fag', 'dyke', 'retard',
    'bastard', 'wanker', 'tosser', 'bugger', 'sodomy',

    // === ENGLISH: Sexual harassment & explicit ===
    'penis', 'vagina', 'boobs', 'tits', 'titties', 'nude', 'nudes',
    'naked', 'sex', 'sexy', 'sexting', 'horny', 'rape', 'molest',
    'masturbate', 'orgasm', 'dildo', 'condom',

    // === GHANAIAN TWI / FANTE INSULTS ===
    // (romanized phonetic spellings students actually use)
    'tw3', 'twe', 'twi3', 'tw33',                          // female genitalia (Twi)
    'wo maame tw3', 'wo mamme tw3', 'w\'maame tw3',        // "your mother's ..." — very severe
    'wo maame', 'wur maame', 'wo maame ho',                // "your mother" in insult context
    'foforo', 'fɔfɔrɔ',                                    // variation
    'ashawo', 'ashwo', 'asewo',                            // sex worker (used as slur)
    'kwasia', 'kwasea', 'kwasiaa', 'kwasε',                // fool/idiot
    'aboa', 'abɔɔ', 'aborɔ',                               // animal/beast (insult)
    'gyimii', 'gyimi', 'gimi',                             // dumb person
    'seebi', 'sebi', 'seebe',                              // low-life
    'burɔnyi', 'broni', 'oburoni hwe',                    // can be used dismissively
    'fɔɔ', 'foo', 'foor',                                  // insult
    'ogyam', 'ogyame',                                     // idiot (Twi)
    'onipa ba', 'nipaaba',                                  // worthless person
    'fufuo', 'fufu',                                       // sometimes used dismissively
    'wukum', 'wokum', 'wo kum me',                         // kill you/me (threat)
    'tirim den', 'tirim d3n',                              // hardheaded/stupid
    'bo w\'ani', 'bowe ani',                               // shut your eyes (dismissive)
    'mote wo', 'mo te wo',                                 // insult phrase

    // === GHANAIAN PIDGIN / CASUAL SLANG (used as slurs) ===
    'useless', 'stupid fool', 'idiot', 'dumb fool',
    'you dey mad', 'you craze', 'mad person', 'madman',
    'your type', 'your type dey there',
    'oloriburuku',                                         // Yoruba insult (common in Ghana)
    'ode', 'o de',                                         // Yoruba — dumb person

    // === THREAT LANGUAGE ===
    'i will kill', 'i go kill', 'i\'ll kill', 'go die', 'kill yourself',
    'kys', 'hang yourself', 'end yourself',
];

// ============================================================
// AI MODERATION — Called for longer texts only (>150 chars)
// Short posts are covered by the hardcoded list above.
// ============================================================
const checkWithAI = async (text) => {
    try {
        const { data, error } = await supabase.functions.invoke('moderate-text', {
            body: { text }
        });
        if (error || !data) return { safe: true }; // Fail open if function errors
        return data; // { safe: boolean, reason: string }
    } catch {
        return { safe: true }; // Fail open on network error
    }
};

// Master content check — runs both layers
const checkContent = async (text) => {
    const lowerText = text.toLowerCase();

    // Layer 1: Fast hardcoded check (no API cost)
    for (const word of BAD_WORDS) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(lowerText)) {
            return { safe: false, reason: 'Contains inappropriate language.' };
        }
    }

    // Layer 2: AI check for longer texts (catches creative bypass attempts)
    if (text.length > 150) {
        const aiResult = await checkWithAI(text);
        if (!aiResult.safe) {
            return { safe: false, reason: 'Your post was flagged by our AI moderator: ' + aiResult.reason };
        }
    }

    return { safe: true };
};

export const addWhisper = async (text) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to post.');

        // Two-layer content moderation (hardcoded list + AI for long texts)
        const modResult = await checkContent(text);
        if (!modResult.safe) {
            return { success: false, error: 'Please keep it clean. ' + modResult.reason };
        }

        const { data, error } = await supabase
            .from('campus_whispers')
            .insert([{ user_id: user.id, text }])
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error adding whisper:', error);
        return { success: false, error: error.message };
    }
};

export const deleteWhisper = async (whisperId) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in.');

        const { error } = await supabase
            .from('campus_whispers')
            .delete()
            .eq('id', whisperId)
            .eq('user_id', user.id); // Double check

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error deleting whisper:', error);
        return { success: false, error: error.message };
    }
};

export const getUserInteractions = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) return { success: true, data: [] };

        const { data, error } = await supabase
            .from('whisper_interactions')
            .select('whisper_id, interaction_type')
            .eq('user_id', user.id);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching user interactions:', error);
        return { success: false, error: error.message };
    }
};

export const interactWithWhisper = async (whisperId, type) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to interact.');

        // Add interaction (RLS handles uniqueness)
        const { error: intError } = await supabase
            .from('whisper_interactions')
            .insert([{ whisper_id: whisperId, user_id: user.id, interaction_type: type }]);

        if (intError) {
            if (intError.code === '23505') {
                return { success: false, error: 'You already interacted with this.' };
            }
            throw intError;
        }

        // Fetch current to increment
        const { data: current } = await supabase.from('campus_whispers').select('*').eq('id', whisperId).single();
        if (current) {
            const updates = {};
            if (type === 'UPVOTE') updates.upvotes = current.upvotes + 1;
            else if (type === 'DOWNVOTE') updates.downvotes = current.downvotes + 1;
            else if (type === 'FLAG') {
                updates.flag_count = current.flag_count + 1;
                if (updates.flag_count >= 3) updates.is_flagged = true; // Auto-hide after 3 flags
            }

            await supabase.from('campus_whispers').update(updates).eq('id', whisperId);
            return { success: true, data: { ...current, ...updates } };
        }

        return { success: true };
    } catch (error) {
        console.error('Error interacting with whisper:', error);
        return { success: false, error: error.message };
    }
};

export const toggleWhisperReaction = async (whisperId, emoji) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to interact.');

        const { error } = await supabase.rpc('toggle_whisper_reaction', {
            p_whisper_id: whisperId,
            p_user_id: user.id,
            p_emoji: emoji
        });

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error toggling whisper reaction:', error);
        return { success: false, error: error.message };
    }
};

// --- WHISPER COMMENTS ---

export const getWhisperComments = async (whisperId) => {
    try {
        const { data, error } = await supabase
            .from('whisper_comments')
            .select('*')
            .eq('whisper_id', whisperId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching comments:', error);
        return { success: false, error: error.message };
    }
};

export const addWhisperComment = async (whisperId, text) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to comment.');

        // Two-layer content moderation
        const modResult = await checkContent(text);
        if (!modResult.safe) {
            return { success: false, error: 'Please keep it clean. ' + modResult.reason };
        }

        // Insert comment
        const { data, error } = await supabase
            .from('whisper_comments')
            .insert([{ whisper_id: whisperId, user_id: user.id, text }])
            .select()
            .single();

        if (error) throw error;

        // Increment comment count on whisper
        const { data: current } = await supabase.from('campus_whispers').select('comment_count').eq('id', whisperId).single();
        if (current) {
            await supabase.from('campus_whispers').update({ comment_count: current.comment_count + 1 }).eq('id', whisperId);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error adding comment:', error);
        return { success: false, error: error.message };
    }
};

// --- THRIFT ---

export const getThriftListings = async () => {
    try {
        const { data, error } = await supabase
            .from('thrift_listings')
            .select('*')
            .eq('status', 'ACTIVE')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching thrift listings:', error);
        return { success: false, error: error.message };
    }
};

export const addThriftListing = async (listingData) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to sell items.');

        // Bundle condition and location into description for schema simplicity
        const description = `Condition: ${listingData.condition}\nLocation: ${listingData.location}`;

        const { data, error } = await supabase
            .from('thrift_listings')
            .insert([{
                user_id: user.id,
                item_name: listingData.title,
                price: parseFloat(listingData.price) || 0,
                description: description,
                image_url: listingData.image_url || 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400&auto=format&fit=crop',
                contact_info: listingData.whatsapp,
                status: 'PENDING'
            }])
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error adding thrift listing:', error);
        return { success: false, error: error.message };
    }
};

// --- FEATURE SUGGESTIONS & UPVOTE BOARD ---

export const getSuggestions = async () => {
    try {
        const { data, error } = await supabase
            .from('feature_suggestions')
            .select('*')
            .order('votes_count', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return { success: false, error: error.message };
    }
};

export const addSuggestion = async (title, description) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to submit a suggestion.');

        const { data, error } = await supabase
            .from('feature_suggestions')
            .insert([{
                user_id: user.id,
                title,
                description,
                votes_count: 1
            }])
            .select()
            .single();

        if (error) throw error;

        // Auto-add the first vote from the creator
        await supabase.from('feature_votes').insert([{
            suggestion_id: data.id,
            user_id: user.id
        }]);

        return { success: true, data };
    } catch (error) {
        console.error('Error adding suggestion:', error);
        return { success: false, error: error.message };
    }
};

export const voteForSuggestion = async (suggestionId) => {
    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('You must be logged in to vote.');

        const { data: existingVote } = await supabase
            .from('feature_votes')
            .select('id')
            .eq('suggestion_id', suggestionId)
            .eq('user_id', user.id)
            .maybeSingle();

        if (existingVote) {
            // Unvote (Delete vote, decrement votes_count)
            await supabase.from('feature_votes').delete().eq('id', existingVote.id);
            const { data: current } = await supabase.from('feature_suggestions').select('votes_count').eq('id', suggestionId).single();
            const nextVotes = Math.max(0, (current?.votes_count || 1) - 1);
            await supabase.from('feature_suggestions').update({ votes_count: nextVotes }).eq('id', suggestionId);
            return { success: true, voted: false, votesCount: nextVotes };
        } else {
            // Vote (Insert vote, increment votes_count)
            await supabase.from('feature_votes').insert([{ suggestion_id: suggestionId, user_id: user.id }]);
            const { data: current } = await supabase.from('feature_suggestions').select('votes_count').eq('id', suggestionId).single();
            const nextVotes = (current?.votes_count || 0) + 1;
            await supabase.from('feature_suggestions').update({ votes_count: nextVotes }).eq('id', suggestionId);
            return { success: true, voted: true, votesCount: nextVotes };
        }
    } catch (error) {
        console.error('Error voting for suggestion:', error);
        return { success: false, error: error.message };
    }
};

export const getUserVotes = async () => {
    try {
        const user = await getCurrentUser();
        if (!user) return { success: true, data: [] };

        const { data, error } = await supabase
            .from('feature_votes')
            .select('suggestion_id')
            .eq('user_id', user.id);

        if (error) throw error;
        return { success: true, data: (data || []).map(v => v.suggestion_id) };
    } catch (error) {
        console.error('Error fetching user votes:', error);
        return { success: false, error: error.message };
    }
};
