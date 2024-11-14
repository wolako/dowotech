FROM node:18-alpine

WORKDIR /app

COPY functions/package*.json ./functions/

WORKDIR /app/functions

RUN npm ci --only=production

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
