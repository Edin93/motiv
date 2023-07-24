require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5050;

mongoose.connect(
    process.env.DB_URL,
    {
        useNewUrlParser: true,
    },
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to DB"));

app.use(express.json());

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.listen(
    PORT,
    () => {
        console.log("Server has started on port: " + PORT);
    },
);
