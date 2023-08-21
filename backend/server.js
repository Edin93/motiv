require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const activityRouter = require('./routes/ActivityRouter');
const userRouter = require('./routes/UserRouter');
const cors = require('cors');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
    },
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to the DB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/activities", activityRouter);
app.use("/api/users", userRouter);

app.listen(
    PORT,
    () => {
        console.log("Server has started on port: " + PORT);
    },
);

// TEST 1 - dump comment to check pushing from a docker container.