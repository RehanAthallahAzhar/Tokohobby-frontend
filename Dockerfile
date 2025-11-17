# Build
FROM node:18-alpine AS builder

WORKDIR /app

# Salin package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY . .


RUN npm run build

# Serve
FROM nginx:1.25-alpine AS final

COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]