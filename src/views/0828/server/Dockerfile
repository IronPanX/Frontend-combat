FROM node:14.17.5
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

CMD [ "node", "index.js" ]

EXPOSE 3000 
