# Stage 1: Compile and Build Angular app using Node.js 18.13.0
FROM node:18.13.0 as build

# Set working directory in the Docker image
WORKDIR /usr/src/app

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with Nginx server
FROM nginx:alpine

# Copy the build output to replace the default Nginx contents.
COPY --from=build /usr/src/app/dist/angular-pwa /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
