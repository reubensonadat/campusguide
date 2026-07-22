-- 1. Add reactions column to campus_whispers
ALTER TABLE public.campus_whispers ADD COLUMN IF NOT EXISTS reactions jsonb DEFAULT '{}'::jsonb;

-- 2. Create RPC function for toggling whisper reactions
CREATE OR REPLACE FUNCTION toggle_whisper_reaction(p_whisper_id uuid, p_user_id uuid, p_emoji text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_existing_id uuid;
  v_reactions jsonb;
  v_current_count int;
BEGIN
  -- Check if user already reacted with this exact emoji
  SELECT id INTO v_existing_id
  FROM public.whisper_interactions
  WHERE whisper_id = p_whisper_id 
    AND user_id = p_user_id 
    AND interaction_type = p_emoji;

  -- Get current reactions JSON
  SELECT coalesce(reactions, '{}'::jsonb) INTO v_reactions
  FROM public.campus_whispers
  WHERE id = p_whisper_id;
  
  v_current_count := coalesce((v_reactions->>p_emoji)::int, 0);

  IF v_existing_id IS NOT NULL THEN
    -- User wants to remove their reaction
    DELETE FROM public.whisper_interactions WHERE id = v_existing_id;
    
    IF v_current_count > 0 THEN
      -- Decrement
      UPDATE public.campus_whispers
      SET reactions = jsonb_set(v_reactions, array[p_emoji], to_jsonb(v_current_count - 1))
      WHERE id = p_whisper_id;
    END IF;
  ELSE
    -- Add new reaction
    INSERT INTO public.whisper_interactions(whisper_id, user_id, interaction_type)
    VALUES (p_whisper_id, p_user_id, p_emoji);
    
    -- Increment
    UPDATE public.campus_whispers
    SET reactions = jsonb_set(v_reactions, array[p_emoji], to_jsonb(v_current_count + 1))
    WHERE id = p_whisper_id;
  END IF;
END;
$$;


-- 3. Add avatar_url column if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url text;

-- 4. Create RPC function for fetching the Leaderboard stats anonymously
CREATE OR REPLACE FUNCTION get_community_leaderboard()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  -- We'll return an array of categories, each with top 3 users.
  -- Format of returned JSON:
  -- [
  --   { "id": "scholar", "title": "The Scholar", "description": "Most Assignments Completed", "top": [{ "name": "User-1A2B", "score": 15 }, ...] },
  --   ...
  -- ]
  
  -- For brevity, we aggregate using CTEs
  WITH 
    anon_users AS (
      -- Use last 3 chars of device_id (e.g. UCC-103F0084 → UCC-084)
      -- This is recognizable to the user but NOT the full login ID
      SELECT id, avatar_url, username,
        'UCC-' || upper(right(coalesce(device_id, id::text), 3)) as anon_name
      FROM public.users
    ),
    
    top_scholars AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(a.id)::int as score
      FROM public.user_assignments a
      JOIN anon_users u ON u.id = a.user_id
      WHERE a.status = 'submitted'
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_procrastinators AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(a.id)::int as score
      FROM public.user_assignments a
      JOIN anon_users u ON u.id = a.user_id
      WHERE a.status IN ('late', 'pending')
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_executors AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(t.id)::int as score
      FROM public.user_tasks t
      JOIN anon_users u ON u.id = t.user_id
      WHERE t.status = 'completed'
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_planners AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(t.id)::int as score
      FROM public.user_tasks t
      JOIN anon_users u ON u.id = t.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_busy_bees AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(t.id)::int as score
      FROM public.user_timetable t
      JOIN anon_users u ON u.id = t.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_whisperers AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(w.id)::int as score
      FROM public.campus_whispers w
      JOIN anon_users u ON u.id = w.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_yappers AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(c.id)::int as score
      FROM public.whisper_comments c
      JOIN anon_users u ON u.id = c.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_critics AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(i.id)::int as score
      FROM public.whisper_interactions i
      JOIN anon_users u ON u.id = i.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_entrepreneurs AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(l.id)::int as score
      FROM public.thrift_listings l
      JOIN anon_users u ON u.id = l.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    ),
    
    top_samaritans AS (
      SELECT u.anon_name as name, u.avatar_url, u.username, count(l.id)::int as score
      FROM public.lost_and_found l
      JOIN anon_users u ON u.id = l.user_id
      GROUP BY u.anon_name, u.avatar_url, u.username
      ORDER BY score DESC LIMIT 3
    )

  SELECT jsonb_build_array(
    jsonb_build_object('id', 'scholar', 'title', 'The Scholar', 'description', 'Most Assignments Completed', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_scholars t), '[]'::jsonb)),
    jsonb_build_object('id', 'procrastinator', 'title', 'The Procrastinator', 'description', 'Most Pending/Late Assignments', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_procrastinators t), '[]'::jsonb)),
    jsonb_build_object('id', 'executor', 'title', 'The Executor', 'description', 'Most Tasks Completed', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_executors t), '[]'::jsonb)),
    jsonb_build_object('id', 'planner', 'title', 'The Master Planner', 'description', 'Most Total Tasks Created', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_planners t), '[]'::jsonb)),
    jsonb_build_object('id', 'busy_bee', 'title', 'The Busiest Bee', 'description', 'Most Classes Registered', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_busy_bees t), '[]'::jsonb)),
    jsonb_build_object('id', 'whisperer', 'title', 'The Whisperer', 'description', 'Most Gossips Posted', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_whisperers t), '[]'::jsonb)),
    jsonb_build_object('id', 'yapper', 'title', 'The Yapper', 'description', 'Most Comments Posted', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_yappers t), '[]'::jsonb)),
    jsonb_build_object('id', 'critic', 'title', 'The Critic', 'description', 'Most Reactions Given', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_critics t), '[]'::jsonb)),
    jsonb_build_object('id', 'entrepreneur', 'title', 'The Entrepreneur', 'description', 'Most Thrift Items Listed', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_entrepreneurs t), '[]'::jsonb)),
    jsonb_build_object('id', 'samaritan', 'title', 'The Good Samaritan', 'description', 'Most Items Found', 'top', coalesce((SELECT jsonb_agg(row_to_json(t)) FROM top_samaritans t), '[]'::jsonb))
  ) INTO result;

  RETURN result;
END;
$$;
