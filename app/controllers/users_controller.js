var User = require('../models/user')

var handlers = {}

handlers.index = function(req, res) {
  User.fetchAll().then(function(users) {
    res.view('users/index', { users: users.toArray() })
  })
}

handlers.new = function(req, res) {
  res.view('users/new', { user: new User() })
}

handlers.create = function(req, res) {
  new User(req.payload).save().then(function(user) {
    res.redirect('/users')
  },
  function(errors) {
    res.view('users/new', {
      user: req.payload,
      errors: errors.errors
    })
  })
}

module.exports = handlers
