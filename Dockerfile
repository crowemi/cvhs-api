FROM node:latest

WORKDIR /app

COPY public/ public/
COPY package.json .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "sh" ]