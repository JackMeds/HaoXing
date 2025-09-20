# Stage 1: Build the Vue.js application
FROM node:18-alpine AS build

WORKDIR /app

# Copy nginx configuration
COPY nginx.conf .

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
