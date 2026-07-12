# ============================================================================
# Production image for the flagship website (Next.js standalone output).
# Bots/services use docker/Dockerfile.service with --build-arg APP=<name>.
# ============================================================================

FROM node:22-alpine AS deps
RUN corepack enable
WORKDIR /repo
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
COPY services ./services
RUN pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /repo
RUN pnpm --filter @sylvara/website build

FROM node:22-alpine AS runtime
ENV NODE_ENV=production PORT=3000
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build --chown=app:app /repo/apps/website/.next/standalone ./
COPY --from=build --chown=app:app /repo/apps/website/.next/static ./apps/website/.next/static
COPY --from=build --chown=app:app /repo/apps/website/public ./apps/website/public
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "apps/website/server.js"]
