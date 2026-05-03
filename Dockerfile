# STAGE 1: Build (The Foundation)
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files first (for faster building)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy your source code from D:\QA\playwrite\Playwright-Practice-APP to the VM
COPY . .

# Build the Angular app
RUN npx ng build --configuration=production

# STAGE 2: Serve (The Final House)
FROM nginx:alpine

# Copy the built files from Stage 1 into the Nginx web server
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80