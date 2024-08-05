FROM --platform=linux/amd64 node:22.1.0-alpine3.19 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM --platform=linux/amd64 node:22.1.0-alpine3.19 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

RUN ls -la /app/dist/src

FROM --platform=linux/amd64 node:22.1.0-alpine3.19 AS runner
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN ls -la /app/dist/src

CMD ["node", "dist/src/main"]
