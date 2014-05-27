/* GET home page. */

var dumpKeys = function(o) { return Object.keys(o); };

var request= require('request');

var client_config = require('../config.js');

exports.oauth = function(req, res) {

  var code = req.query.code,
      state = req.query.state; // we'll ignore this for now for expediency's sake

  request.post({
    uri: 'https://github.com/login/oauth/access_token',
    headers: {
      'Accept': 'application/json'
    },
    form: {
      client_id: client_config.client_id,
      client_secret: client_config.client_secret,
      redirect_uri: 'http://localhost:3000/oauth',
      code: code
    }
  }, function (e, r) {
    if (e) throw e;

    var parsed = JSON.parse(r.body);

    req.session.oauthToken = parsed.access_token;

    var vars = {
      title: 'Mission, success??',
      raw:  JSON.stringify(parsed, null, '  '),
      code: r.statusCode,
      sess: JSON.stringify(req.session, null, '  ')
    };

    res.render('oauth', vars);
  });
};