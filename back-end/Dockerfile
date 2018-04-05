FROM node:latest
MAINTAINER huchangfa<hcf1095246249@qq.com>

RUN mkdir /backend
RUN npm install -g nodemon babel-node
WORKDIR /backend
COPY . /backend

RUN npm install

EXPOSE 4000
ENTRYPOINT nodemon index.js --exec babel-node