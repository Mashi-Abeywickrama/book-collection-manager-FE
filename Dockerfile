# Step 1: Specify the base image
FROM node:18-alpine as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use an Nginx image to serve the build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose the port that the app runs on
EXPOSE 80

# Step 9: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
