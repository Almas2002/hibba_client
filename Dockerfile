FROM node:16-alpine

COPY package*.json ./
WORKDIR /app

RUN npm i npm

RUN npm install

COPY . .

COPY ./dist ./dist