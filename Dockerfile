# syntax=docker/dockerfile:1
   
FROM node:19-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "serve", "build"]