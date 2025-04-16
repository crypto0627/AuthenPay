# Use an official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package*.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy tsconfig
COPY tsconfig.json ./

# Copy source files
COPY src/ ./src

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 5001

# Start the server
CMD ["npm", "run", "start"]
