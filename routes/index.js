var crypto = require('crypto');
var escape = require("querystring").escape;

var pp = function(o) { return JSON.stringify(o,null,'  '); };

/* GET home page. */
exports.index = function(req, res) {

  var sess = req.session;

  if (!sess.oauthToken) {
    res.redirect('/login');
  }

  res.render('index', {
    title: 'Github Social Plugin'
  });
};
/* GET login page. */
exports.login = function(req, res) {
  var state = ['SOME STATE STRING TBD XXX MUST BE HASHED', Date.now()].join(' -- ');
  var hashed = escape(crypto.createHash('sha256').update(state).digest('base64'));
  res.render('login', { title: 'Express', state: hashed });
};

exports.logout = function(req, res) {
  delete req.session;
  res.redirect('/');
};

exports.sidebar = function(req, res) {
  var sess = req.session;
  res.render('sidebar', {
    title: '',
    token: sess.oauthToken
  });
};