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
server.use("/api/posts", logger, PostRouter);
server.use("/api/users", logger, UserRouter);

function logger(req, res, next) {
    const timestamp = new Date(Date.now());

    console.log(
        `\n${req.method} method made to ${
      req.originalUrl
    } at ${timestamp.toLocaleTimeString("en-US")}`
    );

    next();
}

module.exports = server;