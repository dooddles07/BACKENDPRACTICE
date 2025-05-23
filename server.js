require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRouter");



//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port", process.env.PORT);
            console.log("Connected to MongoDB");
        });
    })
    .catch((error) => {
        console.log(error);
    })



