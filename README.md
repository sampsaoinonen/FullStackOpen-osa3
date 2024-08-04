# Fullstack Open - Part 3

This repository contains my solutions for the exercises in Part 3 of the [Fullstack Open](https://fullstackopen.com/en/part3) course.

## Overview

Part 3 of the Fullstack Open course focuses on creating a backend for our application using Node.js and Express. MongoDB is being used as database solution and the app is deployed to the internet.

## Technologies Used

The following technologies and tools were used in this part of the course:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A document-based NoSQL database used for storing our application's data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **morgan**: An HTTP request logger middleware for Node.js.
- **nodemon**: A utility that will monitor for any changes in your source and automatically restart your server.
- **Heroku**: A cloud platform that lets companies build, deliver, monitor, and scale apps.

## Setup and Running the Application

1. Clone the repository:
   ```sh
   git clone https://github.com/sampsaoinonen/FullStackOpen-osa3.git
   cd fullstack-open-part3
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and any other required environment variables:
   ```env
   MONGODB_URI=your-mongodb-uri
   PORT=3001
   ```

4. Run the application:
   ```sh
   npm start
   ```

5. For development purposes, you can use nodemon to automatically restart the server on code changes:
   ```sh
   npm run dev
   ```

## Deployed Application

The application is deployed on RENDER and can be accessed [here](https://fullstack23-osa3.onrender.com).

## Learning Outcomes

- Set up a basic backend server using Node.js and Express.
- Connect the backend to a MongoDB database using Mongoose.
- Implement basic CRUD (Create, Read, Update, Delete) operations.
- Handle errors and validate data.
- Deploy the application to Heroku.


## License

This project is licensed under the MIT [License](LICENSE).
