export const SYNC_ON_SAVE_COOLDOWN_MS = 30000;
export const SYNC_ON_SAVE_THROTTLE_MS = 5000;

export const SYNC_ON_SAVE_EVENT_NAMES = [
  "modify",
  "create",
  "delete",
  "rename",
] as const;

export const getRemainingSyncOnSaveCooldownMs = (
  lastSyncCompletedAt: number,
  now: number = Date.now(),
  cooldownMs: number = SYNC_ON_SAVE_COOLDOWN_MS
) => {
  if (lastSyncCompletedAt <= 0) {
    return 0;
  }

  return Math.max(cooldownMs - (now - lastSyncCompletedAt), 0);
};
