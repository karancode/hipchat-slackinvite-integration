//email_parser.js
module.exports = {

    get_email: function (message_email) {

        var regex_email = /^\/invite(?:\s+(:)?(.+?)\s*$)?/i
        var invite_email = message_email.match(regex_email)[2];
        return invite_email;
    }

}
