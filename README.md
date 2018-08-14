# hipchat-slackinvite-integration
Hipchat integration for getting yourself an invite to slack workspace! 

## Deploy
### Backend API [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Hipchat Integration 
* Create your own integration in hipchat: [Build your own integration](https://confluence.atlassian.com/hc/integrations-with-hipchat-server-683508267.html).
* Make sure to check **Add a Command**
* You slash command **must be** `/invite`.
* Add the url to post. In this case it will be `https://<your-heroku-app-name>/invite`. Make sure to put _/invite_ after the app-name as written in the url.
* Save.

## Configs
* `slack_ws` : Required! Your slack workspace name.
* `slack_token` : Required! Your slack workspace legacy token.
* `hipchat_company` : Required! Your hipchat company name for hipchat url. If not * sure, put 'api' without quotes.
* `hipchat_token` : Required! Your hipchat room (send notification) token.
_Edit the `config.js` file with your values OR Set the values when you deploy to heroku._