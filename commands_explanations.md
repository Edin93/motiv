# Commands and tools explanation page:

## Docker

#### Using Docker without needing to use sudo
* To be able to use Docker without `sudo` each time, you need to do the following steps:
* Add the docker group if it doesn't already exist:
    * ```sudo groupadd docker```
* Add the connected user "$USER" to the docker group. Change the user name to match your preferred user if you do not want to use your current user:
    * ```sudo gpasswd -a $USER docker```

#### To run the applications with docker-compose:
* Need to have:
    * PS: maybe you'll need to run the Docker and the docker compose commands with `sudo` if you haven't done the previous steps.
    * To run the application you will not need to do the commands mentioned on the backend part and the frontend ones, Docker compose will take care of all of that. You will only need to run the following command:
        * ```docker-compose up```
    * VERY IMPORTANT: each time we update the code of the frontend or the backend IMAGES (i.e the Dockerfile files) we need to rerun the `docker-compose` command with the following option `--build` so that the docker-compose can rebuild the docker images and containers with the newly updated code, so the full command is:
        * ```docker-compose up --build```

#### Interact with a running container:
* After executing the ```docker-compose up --build``` command you might want to interact with the frontend and/or the backend running containers (i.e execute commands on the terminal on each of these). To do so, first you need to know the ID of the running container that you want to interact with, by running this command on another terminal:
    * ```docker ps -a```
    * The first column contains the ID of containers(s).
    * To interact with the container, you have to use the following command:
        * ```docker attach id-of-container-you-want-to-use```

#### Coding in the Docker environments:
* First, you need to install VSCode if you haven't yet.
* look for the "Remote Development" extension on VSCode, created by Microsoft and install it.
* After installing it you'll see a green bottom at the bottom left of your VSCode, click on it.
* At this step you should have already run the docker-compose command so that your containers are already running.
* you'll get a prompt menu on the top of your IDE, choose "attach to running container" and choose the "/motiv_backend-motiv-app_1" to work on VSCode for the backend.
* Then redo the same thing for the "/motiv_frontend-motiv-app_1" to run the frontend part.
* Once you're connected to the Docker containers on VSCode, you need to go to the project folder and for both the frontend and the backend it's this one: `/usr/src/app` (the one written as the WORKDIR in the Dockerfile).

#### To run the backend part:
* Need to have:
    * node18.12 installed
    * Mongodb installed
    * The mongodb service running on one's local machine.
    * All node modules installed locally by running on the terminal inside the backend folder: `npm install`
* To build the docker image, on the terminal, go to the backend folder and run:
    * ```docker build -t motiv-backend .```
    * This command will build the docker image and give it the name **motiv-backend**
* To run the backend application as Docker container, execute this command:
    * ```docker run -p 3000:3000 motiv-backend```
* The application must be up and running on http://localhost:3000


#### To run the frontend part:
* Need to have:
    * node18.12 installed
    * the expo-cli package is installed globally, using the following command: `npm i -g expo-cli`.
    * All node modules installed locally by running on the terminal inside the frontend folder: `npm install`
* To build the docker image, on the terminal, go to the frontend folder and run:
    * ```docker build -t motiv-frontend .```
    * This command will build the docker image and give it the name **motiv-frontend**
* To run the frontend application as Docker container, execute this command:
    * ```docker run -it -p 19000:19000 -p 19001:19001 -p 19006:19006 motiv-frontend```
* The application must be up and running on the **WEB** (your navigator) on http://localhost:19006

#### Docker Build and Docker Run 

* Explanation of the Docker build command `docker build -t motiv-frontend .`:
    * `docker build`: This is the command to build a Docker image.
    * `-t motiv-backend`: The -t flag allows you to give a name to the image. In this case, the name is "motiv-backend".
    * `.` (the dot at the end): This is the build context. The dot (.) means that the current directory and its contents will be used as the build context.

* Explanation of the Docker run command `docker run -it -p 19000:19000 -p 19001:19001 -p 19006:19006 motiv-frontend`:
    * `docker run`: This is the command used to create and run a new container based on a specified image.

    * `-it`: These are two flags used together. The -i flag stands for "interactive," and the -t flag stands for "tty" (terminal). Together, they enable an interactive shell within the container, allowing you to interact with it via the terminal.

    * `-p 19000:19000 -p 19001:19001 -p 19006:19006`: These are the port mappings. The -p flag is used to map ports between the host machine and the container. In this case, three ports are being mapped:

    * `-p 19000:19000`: This maps port 19000 from the host to port 19000 in the container. Port 19000 is often used for the Expo development server (Metro Bundler).
    * `-p 19001:19001`: This maps port 19001 from the host to port 19001 in the container. Port 19001 is often used for the Expo development server's web interface.
    * `-p 19006:19006`: This maps port 19006 from the host to port 19006 in the container. Port 19006 is often used for additional Expo-related services.
    * `motiv-frontend`: This is the name or identifier of the Docker image to be used to create the container. Docker will look for the specified image locally on the host machine. If the image is not found locally, Docker will try to download it from a container registry like Docker Hub.
