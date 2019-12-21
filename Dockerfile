FROM node:10.15.1-jessie-slim

WORKDIR /app

COPY ./package.json .
COPY ./.env .
COPY ./README.md .


RUN npm install --silent --production

COPY ./dist .

COPY ./src/model/swagger_def.yaml  ./model

ENV NODE_ENV "production"

EXPOSE 4000

CMD ["node", "index.js"]