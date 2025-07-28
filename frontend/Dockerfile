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

# Create Nginx cache directory and set correct permissions
# Nginx typically runs as 'nginx' user, which needs write access to cache directories.
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx
# Ensure the Nginx log directory has correct permissions
RUN chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx

# Copy the React build files to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration for SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf

# REMOVE THIS LINE: USER nginx
# The official Nginx image's entrypoint handles dropping privileges from root to 'nginx' user.
# Placing USER nginx here causes the master process to try and start as non-root, which fails to bind to privileged ports and write PID.

# Expose Nginx's default port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
