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

  let hipchat_url = modules.get_hipchat_url(req.body.item.room.links.self);

  console.log(req.body.item.message.message);
  if (req.body.item.message.message === "/invite") {
    modules.hipchat_callback(hipchat_url, "gray", "Please try '/invite help' for details!", config.hipchat_token);
    res.send({ "Info": "Updated guide" });
    console.log("only invite send");
    return;
  }

  let invite_email = modules.get_email(req.body.item.message.message);

  if (!invite_email) {
    res.send({ 'Error': 'No email, No invite!' });
  }
  else if (invite_email === 'help') {
    modules.hipchat_callback(hipchat_url, "gray", "Thanks for using hipchat-slackinvite-integration's help!\n You can get yourself invited using /invite <your_email_id> \n If anything goes wrong, please contact Admin! \n Details : https://github.com/kdthanvi/hipchat-slackinvite-integration",
      config.hipchat_token);
    res.send({ "Info": "Help Details" });
    console.log("help sent");
  }
  else if (!invite_email.endsWith("@rakuten.com")) {
    modules.hipchat_callback(hipchat_url, "gray", "Please use valid rakuten emailID!", config.hipchat_token);
    res.send({ "Info": "Use rakuten email" });
    console.log("use rakute emailID");
  }
  else {
    request.post({
      url: 'https://' + config.slack_ws + '.slack.com/api/users.admin.invite',
      form: {
        email: invite_email,
        token: config.slack_token,
        set_active: true
      }
    }, function (err, httpResponse, body) {
      if (err) {
        modules.hipchat_callback(hipchat_url, "red", err + ": error res from slack api", config.hipchat_token);
        res.send({ 'Error': err });
        console.log('error res from slack-api');
        return;
      }
      body = JSON.parse(body);
      if (body.ok) {    //return true if invited successfully
        modules.hipchat_callback(hipchat_url, "green", "Success: invitation sent", config.hipchat_token);
        res.send({ 'Success': 'invitation sent!' });
        console.log('success. invited. response sent!');
        return;
      } else {          //return false otherwise
        let error = body.error;
        if (error === 'already_invited' || error === 'already_in_team') {
          modules.hipchat_callback(hipchat_url, "yellow", error + ": invitation not sent", config.hipchat_token);
          res.send({ 'Err': 'already invited' });
          console.log('err. alerday-there. response sent!');
        }
        else if (error === 'invalid_email') {
          res.send({ 'Err': 'invalid email' });
          modules.hipchat_callback(hipchat_url, "yellow", error + ": invitation not sent", config.hipchat_token);
          console.log('err. invalid-email. response sent!');
        }
        else if (error === 'invalid_auth') {
          modules.hipchat_callback(hipchat_url, "red", error + ': contact admin', config.hipchat_token);
          res.send({ 'Err ': 'un_authed. contact admin' });
          console.log('argh. un_authed. response sent!');
        }
      }
    });
  }
});

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'))



