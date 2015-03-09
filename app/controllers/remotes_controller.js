var remotes = {
  receiver: 'Receiver',
  tv: 'TV',
  ps3: 'PS3'
}

var handlers = {}

handlers.index = function(req, res) {
  res.view('remotes/index', { remotes: remotes })
}

handlers.show = function(req, res) {
  res.view('remotes/' + req.params.remote)
}

module.exports = handlers
