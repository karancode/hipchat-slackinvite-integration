From node:8-alpine

EXPOSE 8080

COPY . /hipchat-slackinvite-integration
WORKDIR /hipchat-slackinvite-integration

RUN npm install

ENTRYPOINT node app.js
