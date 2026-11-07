# Landing estatica: build (Node) + servidor (nginx sem privilegios).
# O build passa pela TRAVA DE PUBLICACAO. Para um build de teste (NAO publicavel):
#   docker compose build --build-arg ALLOW_DRAFT_BUILD=1
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG ALLOW_DRAFT_BUILD=
ENV ALLOW_DRAFT_BUILD=${ALLOW_DRAFT_BUILD}
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --retries=5 CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
