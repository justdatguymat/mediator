FROM node:16-slim AS base
WORKDIR /app


FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM dependencies AS build
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline


FROM node:alpine AS prod
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
