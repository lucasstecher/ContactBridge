FROM node:23-slim
WORKDIR /usr/src/app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm i --frozen-lockfile
COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY . .
RUN pnpm run build
