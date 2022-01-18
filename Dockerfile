FROM node:16
RUN apt-get update && apt-get install -y poppler-utils
WORKDIR /root/bot
COPY . .
RUN yarn
HEALTHCHECK CMD "curl --fail http://localhost:$WEB_PORT || exit 1"
CMD node src/index.js