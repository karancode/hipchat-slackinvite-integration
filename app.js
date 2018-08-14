//app.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const modules = require('./modules')
const request = require("request");

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello. \n Please do HTTP POST at /invite with body-parametere email : your_email_id');
});

app.post('/invite', (req, res) => {
  
  let invite_email = modules.get_email(req.body.item.message.message);
  let hipchat_url = modules.get_hipchat_url(req.body.item.room.links.self);

  if (!invite_email) {
    res.send({ 'Error': 'No email, No invite!' });
  }
  else {
    function doInvite() {
      request.post({
        url: 'https://' + config.slack_ws + '.slack.com/api/users.admin.invite',
        form: {
          email: invite_email,
          token: config.slack_token,
          set_active: true
        }
      }, function (err, httpResponse, body) {
        if (err) {
          console.log('error res from slack-api');
          return res.send({ 'Error': err });
        }
        body = JSON.parse(body);
        if (body.ok) {    //return true if invited successfully
          res.send({ 'Success': 'invitation sent!' });
          console.log('success. invited. response sent!');
          return;
        } else {          //return false otherwise
          let error = body.error;
          if (error === 'already_invited' || error === 'already_in_team') {
            res.send({ 'Err': 'already invited' });
            console.log('err. alerday-there. response sent!');
          }
          else if (error === 'invalid_email') {
            res.send({ 'Err': 'invalid email' });
            console.log('err. invalid-email. response sent!');
          }
          else if (error === 'invalid_auth') {
            request.post({
              url : hipchat_url+ '/notification?auth_token=' + config.hipchat_token,
              form : {
                "color" : "green",
                "message" : "argh! invalid auth sent!",
                "message_format" : "text",
                "notify" : false
              }
            }, function(error, response, body) {
              if(error){
                console.log(error);
                return;
              }
              //res.send({ 'Argh': 'invalid auth, contact admin' });
              //console.log(body);
            });
            console.log('argh. un_authed. response sent!');
          }
        }
      });
    }
    doInvite();
  }
});

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'))



