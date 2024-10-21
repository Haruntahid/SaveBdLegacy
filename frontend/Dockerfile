# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source
COPY . .

# Build the React application using Vite
RUN npm run build

# Use nginx to serve the frontend
FROM nginx:alpine

# Copy the build output to the Nginx document root
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
