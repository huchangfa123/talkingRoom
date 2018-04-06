FROM node:latest
MAINTAINER huchangfa<hcf1095246249@qq.com>

RUN mkdir /front
RUN npm install -g nodemon babel-cli
WORKDIR /front
COPY . /front

RUN npm install

EXPOSE 4001
ENTRYPOINT nodemon start.js --exec babel-node