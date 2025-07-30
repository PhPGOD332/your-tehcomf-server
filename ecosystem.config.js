module.exports = {
  apps: [
    {
      name: 'your-tehcomf-server',
      script: 'src/main.ts',
      args: '-p 3001',
      exec_mode: 'fork',
      instances: '1'
    }
  ]
}