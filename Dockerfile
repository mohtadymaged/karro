# Karro — single-image build: build the React app, then serve it from the API.
FROM node:22-alpine AS build
WORKDIR /src

# install deps (cached on lockfiles)
COPY app/package*.json app/
RUN cd app && npm ci
COPY server/package*.json server/
RUN cd server && npm ci

# build the front-end
COPY . .
RUN cd app && npm run build

# ── runtime image ──
FROM node:22-alpine
WORKDIR /src
ENV NODE_ENV=production PORT=4000
# server code + its node_modules, and the built front-end
COPY --from=build /src/server ./server
COPY --from=build /src/app/dist ./app/dist
EXPOSE 4000
CMD ["node", "server/index.js"]
