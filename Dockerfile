FROM node:15-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3031
CMD ["node","server.js"]

