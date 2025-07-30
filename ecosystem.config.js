module.exports = {
  apps: [
    {
      name: 'your-tehcomf-server',
      script: 'dist/main.ts',
      args: '-p 3001',
      exec_mode: 'fork',
      instances: '1'
    }
  ]
}