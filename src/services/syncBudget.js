import { supabase } from '../lib/supabase';
import { getUserId } from './syncHelpers';

export async function pushBudgetToCloud() {
  const userId = getUserId();
  if (!userId) return;

  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_budget_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('budget_transactions')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_budget_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushBudget tombstones error:', e);
  }

  let transactions = JSON.parse(localStorage.getItem('ucc_budget') || '[]');
  if (!transactions.length) return;

  const seen = new Set();
  transactions = transactions.filter(t => {
    const key = `${t.description || t.category}-${t.amount}-${t.date || new Date().toISOString().split('T')[0]}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  localStorage.setItem('ucc_budget', JSON.stringify(transactions));

  const rows = transactions.map(t => ({
    id: t.id,
    user_id: userId,
    type: t.type,
    amount: parseFloat(t.amount) || 0,
    category: t.category,
    description: t.description || '',
    created_at: t.date ? new Date(t.date).toISOString() : new Date().toISOString(),
    deleted_at: null,
  }));

  const { error } = await supabase
    .from('budget_transactions')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushBudget error:', error.message);
  } else {
    console.log('[syncService] pushBudget OK:', rows.length, 'rows');
  }
}

export async function pullBudgetFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('budget_transactions')
    .select('id, type, amount, category, description, created_at')
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullBudget error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localTxns = data.map(row => ({
      id: row.id,
      type: row.type,
      amount: row.amount,
      category: row.category,
      description: row.description || '',
      date: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    }));

    const seen = new Set();
    const deduped = localTxns.filter(t => {
      const key = `${t.description || t.category}-${t.amount}-${t.date}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem('ucc_budget', JSON.stringify(deduped));
  }
}
