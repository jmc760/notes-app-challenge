# First stage: React application build
FROM node:22-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Second stage: serving the application with Nginx
FROM nginx:alpine

# Copy the React build files to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration for SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Switch to a non-root user for security
# The 'nginx' user is typically created by the official Nginx image.
USER nginx

# Expose Nginx's default port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]