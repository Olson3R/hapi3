var Path = require('path')
var Hapi = require('hapi')
var Jade = require('jade')
var templatePath = Path.join(__dirname, 'app/views')

// server
var server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 4000,
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  },
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
})

// register views
server.views({
  engines: {
    jade: Jade
  },
  path: templatePath,
  partialsPath: templatePath,
  defaultExtension: 'jade',
  compileMode: 'sync',
  compileOptions: {
    basedir: templatePath
  }
})

// routes
server.route(require('./config/routes').routes)

// register plugins and start server
server.register(require('./config/plugins').plugins, function(err) {
  if (err) {
    throw err
  }

  // start server
  server.start(function() {
    console.info('Server started at ' + server.info.uri)
  })
})

