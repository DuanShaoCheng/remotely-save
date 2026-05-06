import assert from "assert";
import {
  SYNC_ON_SAVE_COOLDOWN_MS,
  SYNC_ON_SAVE_EVENT_NAMES,
  SYNC_ON_SAVE_THROTTLE_MS,
  getRemainingSyncOnSaveCooldownMs,
} from "../src/syncOnSave";

describe("sync on save helpers", () => {
  it("registers create alongside the other vault change events", () => {
    assert.deepStrictEqual(SYNC_ON_SAVE_EVENT_NAMES, [
      "modify",
      "create",
      "delete",
      "rename",
    ]);
  });

  it("computes the remaining cooldown before retrying file-change sync", () => {
    const lastSyncCompletedAt = 10_000;
    const now = 20_000;

    assert.equal(
      getRemainingSyncOnSaveCooldownMs(
        lastSyncCompletedAt,
        now,
        SYNC_ON_SAVE_COOLDOWN_MS
      ),
      20_000
    );
    assert.equal(getRemainingSyncOnSaveCooldownMs(0, now), 0);
    assert.equal(
      getRemainingSyncOnSaveCooldownMs(
        now - SYNC_ON_SAVE_COOLDOWN_MS - 1,
        now
      ),
      0
    );
    assert.equal(SYNC_ON_SAVE_THROTTLE_MS, 5_000);
  });
});
