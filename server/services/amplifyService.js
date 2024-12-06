const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, GITHUB_OAUTH_TOKEN } = require("../config.js");

const amplify = new AWS.Amplify({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

const createApp = async (repoUrl) => {
    const params = {
        name: `App-${Date.now()}`,
        repository: repoUrl,
        platform: "WEB",
        oauthToken: GITHUB_OAUTH_TOKEN,
    };

    try {
        const response = await amplify.createApp(params).promise();
        return response.app.appId;
    } catch (error) {
        console.error("Error creating Amplify app:", error);
        throw new Error("Failed to create app on Amplify.");
    }
};

module.exports = { createApp };
