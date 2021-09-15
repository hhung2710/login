const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require("./router");

app.use(express.json());

app.use("/user", userRouter);

mongoose
  .connect(
    "mongodb+srv://hung:123@cluster0.dsorw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
