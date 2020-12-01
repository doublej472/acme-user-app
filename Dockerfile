FROM node:14
WORKDIR /app
EXPOSE 8080

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node","index.js"]
