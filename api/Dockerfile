FROM node:16-slim AS base
WORKDIR /api

FROM base AS build
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM build AS dev 
CMD ["yarn", "dev"]
