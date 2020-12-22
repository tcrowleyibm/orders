FROM node
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD [ "node", "server.js"]