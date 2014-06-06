var request= require('request');
var client_config = require('../config');

exports.oauth = function(req, res) {

  if (req.session.oauthToken) {
    res.redirect('/sidebar');
  }

  var code = req.query.code,
      state = req.query.state; // we'll ignore this for now for expediency's sake

  var form = {
    client_id: client_config.client_id,
    client_secret: client_config.client_secret,
    redirect_uri: 'http://localhost:3000/oauth',
    code: code
  };

  request.post({
    uri: 'https://github.com/login/oauth/access_token',
    headers: {
      'Accept': 'application/json'
    },
    form: form
  }, function (e, r) {
    if (e) throw e;

    var parsed = JSON.parse(r.body);

    if (parsed.access_token) {
      req.session.oauthToken = parsed.access_token;
    }
    else {
      console.log("no access_token???");
      console.log(parsed);
    }

    // var vars = {
    //   title: 'Mission, success??',
    //   raw:  JSON.stringify(parsed, null, '  '),
    //   code: r.statusCode,
    //   sess: JSON.stringify(req.session, null, '  ')
    // };

    // res.render('oauth', vars);

    res.redirect('/sidebar');
  });
};