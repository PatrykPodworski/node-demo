FROM node:16

# Create working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Run the app
EXPOSE 8080
CMD ["npm", "run", "start"]

# Commands
# docker build . -t patrykpodworski/food-server
# docker --context run -p 8080:8080 -d patrykpodworski/food-server
# docker rm $(docker ps --filter status=exited -q)