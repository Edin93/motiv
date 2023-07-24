# Step 1: Choose the base image for Node.js
FROM node:18.12

# Step 3: Set environment variables (optional, but can be useful for customization)
ENV EXPO_DEBUG=false
ENV EXPO_USE_DEV_SERVER=true

# Step 4: Set up the working directory
WORKDIR /usr/src/app

# Step 5: Copy package.json and package-lock.json (if available) to leverage Docker caching
COPY package*.json ./

# Step 6: Install Node.js dependencies
RUN npm install

# Step 7: Expose the port for Expo development server (Metro Bundler)
EXPOSE 19000
EXPOSE 19001

# Step 8: Expose the port for the Expo web interface
EXPOSE 19006

# Step 9: Copy the rest of the React Native project files
COPY . .

# Step 10: Specify the command to start the Expo development server
CMD ["npm", "run", "start"]
