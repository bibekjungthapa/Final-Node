const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyparser.json());
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
  },

  {
    collection: "forum",
  }
);
const Users = mongoose.model("UserModel", UserSchema);

const postSchema = new mongoose.Schema(
  {
    Question: { type: String, required: true },
    breifQuestion: { type: String, required: true },
  },
  {
    collection: "post",
  }
);

const postData = mongoose.model("postModel", postSchema);
const port = 3003;

const uri = "mongodb://localhost:27017/disscusion";
async function connect() {
  try {
    mongoose.connect(uri, { useNewUrlparser: true, useUnifiedTopology: true });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
}
connect();
app.post("/register", async (req, res) => {
  Users.create(req.body);
  res.json({ msg: "Hey good morning" });
});

app.post("/posts", async (req, res) => {
  postData.create(req.body);
  res.json({
    msg: "post created successfully"
  })
});

app.get("/posts", async (req, res) => {
  const post = await postData.find({});
  res.json({
    post: post,
  });
});

app.post("/login", async (req, res) => {
  const userExistArr = await Users.find({ email: req.body.email });
  if (userExistArr.length > 0) {
    res.json({
      message: "USer USer found  found",
    });
  } else {
    res.json({ message: "USerfound not found " });
  }
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
