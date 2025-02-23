FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npx", "nodemon", "server.js"]
