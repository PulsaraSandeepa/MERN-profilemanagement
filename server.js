const express = require("express");
const mongoose = require("mongoose");

const posts =require('./routes/api/posts');
const profile =require('./routes/api/profile');
const users =require('./routes/api/users');


const app = express();

//db config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(error));

app.get("/", (req, res) => res.send("Hello world!"));


//use routes
app.use("/api/posts",posts);
app.use("/api/profile",profile);
app.use("/api/users",users);


const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port${port}`));
