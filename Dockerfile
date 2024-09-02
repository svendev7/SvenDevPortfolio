# Stage 1: Build the React frontend
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]