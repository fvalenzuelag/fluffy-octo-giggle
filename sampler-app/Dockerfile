# Imagen ligera para demostración en clase (Node + Alpine)
FROM node:20-alpine

WORKDIR /app

# Dependencias primero (mejor uso de capas en Docker)
COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY public ./public

RUN chown -R node:node /app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["node", "server.js"]
