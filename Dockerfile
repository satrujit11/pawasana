# Use an official Node.js image as the base image
FROM node:18

RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application runs
EXPOSE 80

# Start the server
CMD ["npm", "run", "express"]

