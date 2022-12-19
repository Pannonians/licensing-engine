module.exports = {
  apps: [
    {
      name: "server",
      cwd: "./server",
      script: "yarn",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "frontend",
      cwd: "./frontend",
      script: "yarn",
      args: "run dev",
    },
  ],
  deploy: {},
};
