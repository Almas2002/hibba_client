FROM node:16-alpine


WORKDIR /app

COPY package*.json ./

RUN npm i npm

RUN npm install

COPY . .

