# Todo_App

## Description
For the Take Home Challenge, I've developed an application tailored for efficient todo management. This application empowers users to seamlessly organize tasks within projects, enabling them to create new projects and efficiently manage todos within each project. With intuitive functionalities such as adding, editing, updating, and marking todos as complete, users can streamline their workflow effortlessly.
## Setup
1. Make sure you have Node.js and MongoDB installed on your system.
2. Clone this repository to your local machine:
     - Download the zip file and extract it
    or
    ```
    git clone https://github.com/Anandkrishna017/todo_app.git
    ```
4. Navigate to the project directory:
    ```
    cd todo_app-main
    ```
5. Install the backend dependencies:
    ```
    cd server
    npm install
    ```
6. Navigate to the `client` directory and install the frontend dependencies:
    ```
    cd client
    npm install
    ```
## Run
1. Start the MongoDB server.
2. Back to the project root directory, start the backend server:
    ```
    cd server
    npm start
    ```
3. Create an `.env` file inside the server directory and add the following variables:
    ```
    URL=mongodb://localhost:27017/test
    PORT=8080
    JWT_SECRET=key
    ```
4. In a separate terminal, navigate to the `client` directory and start the frontend server:
    ```
    cd client
    npm start
    ```
5. Open your browser and navigate to `http://localhost:3000` to access the todo application.

## Test
- There are no automated tests included in this project. However, you can manually test the functionality by:
    - Signing up using your first name, last name, email, and password.
    - Signing in using your registered email and password.
    - Adding or deleting projects on the home page.
    - Inside a project, you can add, delete, or update todos and their descriptions.
    - Exporting the gist file to the local system.
    - Logging out of the application on the home page.

