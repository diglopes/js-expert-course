FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# CMD ["npm", "t"]
# CMD [ "npm", "start" ]
# CMD ["npm", "run", "test:cov"]