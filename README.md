# Motiv

#### Running the application for development

##### To run the backend part:
* Need to have:
    * node18.12 installed.
    * Mongodb installed
    * The mongodb service running on one's local machine.

* To build the docker image, on the terminal, go to the backend folder and run:
    * ```docker build -t motiv-backend .```
    * This command will build the docker image and give it the name **motiv-backend-image**
* To run the backend application as Docker container, execute this command:
    * ```docker run -p 3000:3000 motiv-backend```
* The application must be up and running on http://localhost:3000

