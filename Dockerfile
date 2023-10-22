# Set base image
FROM node:18 AS builder

# Set working directory
WORKDIR /app/

# Copy other project files and build
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:latest

# Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -rf /app

# Set working directory
WORKDIR /usr/share/nginx/html

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]