const express = require("express");
const cors = require("cors");
const PostRouter = require("./posts/postRouter.js");
const UserRouter = require("./users/userRouter.js");
const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use("/api/posts", PostRouter);
server.use("/api/users", UserRouter);

function logger(req, res, next) {}

module.exports = server;