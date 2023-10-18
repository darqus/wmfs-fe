FROM node:20-bullseye
WORKDIR /app
COPY . .
RUN yarn install && yarn build
