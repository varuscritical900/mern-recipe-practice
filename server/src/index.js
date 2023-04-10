//import
//old way of import
// const express = require('express');
//new way to import
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from "./routes/users.js";

const app = express();
//middleware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

//routes
mongoose.connect("mongodb+srv://varuscritical900:MERNpassword123@recipes.avivtp0.mongodb.net/recipes?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);

//connection
app.listen(3001, ()=> console.log("SERVER STARTED"));