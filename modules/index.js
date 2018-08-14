//index.js
const request = require('request');
const config = require('../config')
module.exports = {

    get_email: function (message_email) {
        var regex_email = /^\/invite(?:\s+(:)?(.+?)\s*$)?/i
        var invite_email = message_email.match(regex_email)[2];
        return invite_email;
    },

    get_hipchat_url: function(hipchat_api_url) {
        var hipchat_url = hipchat_api_url.replace("api", "rakuten")
        return hipchat_url;
    },

    hipchat_callback: function(hipchat_url, hipchat_color, hipchat_message, hipchat_token){
        request.post({
            url : hipchat_url+ '/notification?auth_token=' + hipchat_token,
            form : {
              "color" : hipchat_color,
              "message" : hipchat_message,
              "message_format" : "text",
              "notify" : false
            }
          }, function(error, response, body) {
            if(error){
              console.log(error);
              return;
            }
            console.log('hipchat_callback : OK');
          });

    }
}
