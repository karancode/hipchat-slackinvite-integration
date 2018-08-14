module.exports = {

    slack_ws : process.env.slack_ws || 'pay-rakuten', //your workspace name goes here
    slack_token : process.env.slack_token || 'xoxp-XXXX', //your slack legacy token goes here

    hipchat_token : process.env.hipchat_token || 'XXXX', //your hipchat token

    hipchat_company : process.env.hipchat_company || "XXXX" // your hipchat url domain name
};
