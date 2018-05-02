// deployment configuration

module.exports = {
  deployment: {
    src: 'docs/_book/**/*.*',
    host: '111.22.33.44',
    username: 'username',
    password: 'password',
    dest: '/var/www/path/',
    readyTimeout: 60000
  }
}
