import Constants from "expo-constants";

let releaseChannel: "test" | "production" | "staging" = "test";

/* ToDo: Move credentials to env variables */

export const settings = {
    test: {
        apiBaseUrl: "http://localhost:3000",
    },
    staging: {
        apiBaseUrl: "http://localhost:3000",
    },
    production: {
        apiBaseUrl: "http://localhost:3000",
    }
}

const currentEnvironmentConfig = (() => {
    if (Constants.manifest && Constants.manifest.releaseChannel &&
        (Constants.manifest.releaseChannel === "test" ||
        Constants.manifest.releaseChannel === "staging" ||
        Constants.manifest.releaseChannel === "production")) {
        releaseChannel = Constants.manifest.releaseChannel;
        return settings[releaseChannel];
    }
    return settings.test;
})();

export const AppAPI = {
    ...currentEnvironmentConfig,
    releaseChannel,
}
