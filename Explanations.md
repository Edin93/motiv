# Commands and tools explanation page:

## Docker
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
