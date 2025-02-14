FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

# Copy the entire project, maintaining the correct structure
COPY . .

RUN yarn build

# Stage 2: Serve the React app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80
