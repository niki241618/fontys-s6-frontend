# Use an official Node.js image as the base image
FROM node:14-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the remaining source code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]