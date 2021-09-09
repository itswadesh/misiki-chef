module.exports = {
  apps: [
    {
      name: 'foodaffair-chef',
      script: 'npm',
      automation: false,
      args: 'run start',
      env: {
        NODE_ENV: 'development',
      },
      envProduction: {
        NODE_ENV: 'production',
      },
    },
  ],
}
