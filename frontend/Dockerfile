FROM node:18.17.1-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

FROM node:18.17.1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY package.json next.config.js tsconfig.json ./

RUN npm run build

FROM node:18.17.1-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["npm", "run", "start"]
