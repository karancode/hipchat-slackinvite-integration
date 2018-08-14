//email_parser.js
module.exports = {

    get_email: function (message_email) {

        var regex_email = /^\/invite(?:\s+(:)?(.+?)\s*$)?/i
        var invite_email = message_email.match(regex_email)[2];
        return invite_email;
    },

    get_hipchat_url: function(hipchat_api_url) {

        var hipchat_url = hipchat_api_url.replace("api", "rakuten")
        return hipchat_url;
    }
}
