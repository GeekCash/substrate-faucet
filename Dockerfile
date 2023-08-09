FROM node:18-alpine as build

WORKDIR /build

ARG NODE_ENV

COPY . .

ENV NODE_ENV=$NODE_ENV

RUN npm install && npm run build

FROM node:18-alpine
WORKDIR /app

COPY package.json .
RUN npm install --production
COPY --from=build /build/dist .

CMD ["node", "/app/app.js"]