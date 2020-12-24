const db = require("./userDb");

const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    // do your magic!
    db.insert(req.body)

    .then(user => {
        res.status(201).json(user);
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error adding user." });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
    // do your magic!
    const newPost = {
        ...req.body,

        user_id: req.user.id
    };

    Posts.insert(newPost)

    .then(post => {
        res.status(201).json(post);
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error adding post." });
    });
});

router.get("/", (req, res) => {
    // do your magic!
    db.get()
        .then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(500).json({
                    errorMessage: "The users information could not be retrieved."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({});
        });
});

router.get("/:id", validateUserId, (req, res) => {
    // do your magic!
    const id = req.params.id;

    db.getById(id)

    .then(users => {
        if (users) {
            res.send(users);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res
            .status(500)
            .json({ error: "The user information could not be retrieved." });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
    // do your magic!
    db.getUserPosts(req.user.id)

    .then(posts => {
        res.status(200).json(posts);
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({
            message: "Error retrieving posts."
        });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
    // do your magic!
    const id = req.params.id;

    db.remove(id)

    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put("/:id", (req, res) => {
    // do your magic!
    const id = req.params.id;

    const changes = req.body;

    db.update(id, changes)

    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        } else if (changes.name && changes.bio) {
            res.json(changes);
        } else {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            });
        }
    })

    .catch(err => {
        res.status(500).json({
            error: "The user information could not be modified."
        });
    });
});

//custom middleware

function validateUserId(req, res, next) {
    // do your magic

    const id = req.params.id;

    db.getById(id)

    .then(user => {
        if (!user) {
            res.status(400).json({ message: "Invalid user id." });
        } else {
            req.user = user;

            next();
        }
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error retrieving user id." });
    });
}

function validateUser(req, res, next) {
    // do your magic!
    const body = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: "Missing user data." });
    } else if (!body.name) {
        res.status(400).json({ message: "Missing required name field." });
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    // do your magic!
    const body = req.body;

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: "Missing user data." });
    } else if (!body.text) {
        res.status(400).json({ message: "Missing required text field." });
    } else {
        next();
    }
}

module.exports = router;