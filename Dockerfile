FROM node:20.15.1-alpine3.20

WORKDIR /usr/src/app

COPY package.json ./
COPY public ./public/
COPY server.js ./
COPY app/ ./app/

RUN npm ci

USER node
EXPOSE 3111
CMD ["node", "server.js"]
