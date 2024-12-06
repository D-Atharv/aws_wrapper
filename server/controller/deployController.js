const { createApp } = require("../services/amplifyService");

exports.deployProject = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ success: false, error: "GitHub repository URL is required." });
  }

  try {
    const appId = await createApp(repoUrl);
    const deployUrl = `https://${appId}.amplifyapp.com`;
    return res.json({ success: true, deployUrl });
  } catch (error) {
    console.error("Deployment failed:", error);
    return res.status(500).json({ success: false, error: "Failed to deploy project." });
  }
};
