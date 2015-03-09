var checkit = require('checkit')
var bookshelf = require('../../config/database').bookshelf

var User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('saving', this.validate.bind(this))
  },
  validations: {
    name: ['required'],
    email: ['required', 'email']
  },
  validate: function() {
debugger
    return new checkit(this.validations).run(this.toJSON())
  }
})

module.exports = User
