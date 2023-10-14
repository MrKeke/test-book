FROM node:14

WORKDIR /test-book

COPY package*.json ./

RUN npm install

COPY public/index.html ./public/

COPY . .

RUN npm run build

CMD ["npm", "start"]
