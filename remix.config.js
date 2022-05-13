/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [".*", "**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverBuildTarget: "netlify",
  server: "./server.js",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "netlify/functions/server/index.js",
  publicPath: "/build/",
  devServerPort: 8002,
};
