FROM node:22.16-slim

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install curl ffmpeg -y

WORKDIR /home/app

COPY package*.json .
RUN npm install

COPY main.sh .
COPY script.js .
COPY .env .
RUN chmod +x main.sh
RUN chmod +x script.js

ENTRYPOINT [ "bash", "/home/app/main.sh" ]

