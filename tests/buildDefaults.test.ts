import { strict as assert } from "assert";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getBuildDefaults } = require("../buildDefaults.js");

describe("build defaults", () => {
  it("falls back to public OAuth defaults when env is empty", () => {
    const defaults = getBuildDefaults({});

    assert.equal(defaults.DEFAULT_DROPBOX_APP_KEY, "uwxv4ofkrmc4zzf");
    assert.equal(
      defaults.DEFAULT_ONEDRIVE_CLIENT_ID,
      "3729fc1c-0af2-4bec-9376-d7ac4f0ff806"
    );
    assert.equal(
      defaults.DEFAULT_ONEDRIVE_AUTHORITY,
      "https://login.microsoftonline.com/common"
    );
  });

  it("prefers environment overrides", () => {
    const defaults = getBuildDefaults({
      DROPBOX_APP_KEY: "dropbox-override",
      ONEDRIVE_CLIENT_ID: "onedrive-override",
      ONEDRIVE_AUTHORITY:
        "https://login.microsoftonline.com/organizations",
    });

    assert.equal(defaults.DEFAULT_DROPBOX_APP_KEY, "dropbox-override");
    assert.equal(defaults.DEFAULT_ONEDRIVE_CLIENT_ID, "onedrive-override");
    assert.equal(
      defaults.DEFAULT_ONEDRIVE_AUTHORITY,
      "https://login.microsoftonline.com/organizations"
    );
  });
});
