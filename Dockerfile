FROM node:20.15.1-alpine3.20

WORKDIR /usr/src/app

COPY Makefile ./
COPY package.json ./
COPY public ./public/
COPY server.js ./
COPY app/ ./app/

RUN npm install

USER node
EXPOSE 3000
CMD ["node", "server.js"]
