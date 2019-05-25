# Use nginx as a parent image
FROM node:alpine

# Set the working directory in the container to app
WORKDIR /app

# Copy the current directory contents into the container at .
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]

# To get the docker container running and access it ->
# docker build --tag=simple_todo .
# docker run -p 8080:3001 simple_todo
# Should now be able to access in browser at http://<docker_ip>:8080/

# To bash into the container
# docker ps to get container ID
# docker exec -it <container_id> /bin/sh