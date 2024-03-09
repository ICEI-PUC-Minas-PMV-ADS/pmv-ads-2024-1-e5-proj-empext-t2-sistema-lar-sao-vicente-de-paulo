FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn prisma generate

RUN yarn build

# --------------------------------------------------------------------------------------------------

FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --production

# --------------------------------------------------------------------------------------------------

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

CMD ["node", "dist/main.js"]