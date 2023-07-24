# Step 1: Choose the base image for Node.js
FROM node:18.12

# Step 2: Set environment variables (optional, but can be useful for customization)
ENV NODE_ENV=development
ENV PORT=3000

# Step 3: Install system dependencies (if needed)
# For MongoDB, we don't need to install it in the Dockerfile, as we'll be connecting to a remote MongoDB instance.

# Step 4: Create and set the working directory
WORKDIR /usr/src/app

# Step 5: Copy package.json and package-lock.json (if available) to leverage Docker caching
COPY package*.json ./

# Step 6: Install Node.js dependencies
RUN npm install

# Step 7: Copy the rest of the application source code
COPY . .

# Step 8: Expose the port your application is listening on
EXPOSE 3000

# Step 9: Specify the command to run your Node.js application
CMD ["npm", "run", "dev"]
