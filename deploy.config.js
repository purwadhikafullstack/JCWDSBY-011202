module.exports = {
  apps: [
    {
      name: 'JCWDSBY-0112-02', // Format JCWD-{batchcode}-{groupnumber}
      script: './apps/api/dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 1122,
      },
      time: true,
      watch: true,
      ignore_watch: ['node_modules'],
    },
  ],
};
