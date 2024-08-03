FROM --platform=linux/amd64 node:22.1.0-alpine3.19 as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM --platform=linux/amd64 node:22.1.0-alpine3.19 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

FROM --platform=linux/amd64 node:22.1.0-alpine3.19 as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
