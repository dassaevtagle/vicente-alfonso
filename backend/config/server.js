const dev = process.env.NODE_ENV !== 'production'

const devConfig = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
})

const prodConfig = ({ env }) => ({
  proxy: true,
  url: env('APP_URL'), // replaces `host` and `port` properties in the development environment
  app: { 
    keys: env.array('APP_KEYS')
  },
})

module.exports = dev ? devConfig : prodConfig