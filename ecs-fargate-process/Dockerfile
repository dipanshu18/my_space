FROM ubuntu:focal

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install curl ffmpeg -y

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

WORKDIR /home/app

COPY package*.json .
RUN npm install

COPY main.sh .
COPY script.js .
COPY .env .
RUN chmod +x main.sh
RUN chmod +x script.js

ENTRYPOINT [ "bash", "/home/app/main.sh" ]

