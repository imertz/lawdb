module.exports = {
  apps: [{
    name: 'lawdb',
    script: './app.js',
    interpreter: 'babel-node'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-35-166-122-24.us-west-2.compute.amazonaws.com',
      key: '~/Downloads/Acer-laptop.pem',
      ref: 'origin/master',
      repo: 'git@github.com:imertz/lawdb.git',
      path: '/home/ubuntu/lawdb',
      'forward-agent': 'yes',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
