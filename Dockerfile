FROM node:18

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install
CMD [ "npm", "start" ]