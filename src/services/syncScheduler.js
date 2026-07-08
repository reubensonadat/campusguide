import { getLastSync, SYNC_INTERVAL, setLastSync } from './syncHelpers';
import { pushTimetableToCloud, pullTimetableFromCloud } from './syncTimetable';
import { pushAssignmentsToCloud, pullAssignmentsFromCloud } from './syncAssignments';
import { pushGPAToCloud, pullGPAFromCloud } from './syncGPA';
import { pushTasksToCloud, pullTasksFromCloud } from './syncTasks';
import { pushBudgetToCloud, pullBudgetFromCloud } from './syncBudget';

const LINKED_DEVICE_KEY = 'ucc_is_linked_device';

export async function fullSync() {
  const lastSync = getLastSync();
  const now = Date.now();

  await pushTimetableToCloud();
  await pushAssignmentsToCloud();
  await pushGPAToCloud();
  await pushTasksToCloud();
  await pushBudgetToCloud();

  await pullTimetableFromCloud();
  await pullAssignmentsFromCloud();
  await pullGPAFromCloud();
  await pullTasksFromCloud();
  await pullBudgetFromCloud();

  setLastSync();
  console.log('[syncService] fullSync complete');
}

export async function quickPushTimetable() {
  await pushTimetableToCloud();
}

export async function quickPushAssignments() {
  await pushAssignmentsToCloud();
}

export async function quickPushGPA() {
  await pushGPAToCloud();
}

export async function quickPushTasks() {
  await pushTasksToCloud();
}

let syncTimer = null;

export function startAutoSync() {
  if (syncTimer) return;

  const lastSync = getLastSync();
  if (Date.now() - lastSync >= SYNC_INTERVAL) {
    fullSync();
  }

  syncTimer = setInterval(() => {
    fullSync();
  }, SYNC_INTERVAL);

  console.log('[syncService] auto-sync started (every 24h)');
}

export function stopAutoSync() {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log('[syncService] auto-sync stopped');
  }
}

export function markDeviceAsLinked() {
  localStorage.setItem(LINKED_DEVICE_KEY, 'true');
}

export function isLinkedDevice() {
  return localStorage.getItem(LINKED_DEVICE_KEY) === 'true';
}
