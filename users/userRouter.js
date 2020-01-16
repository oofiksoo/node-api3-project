const db = require("./data/dbConfig.js");

const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    // do your magic!
    db.post("/api/users", (req, res) => {
        const dbData = req.body;

        if (dbData.name && dbData.bio) {
            db.insert(dbData)

            .then(user => {
                res.json(user);
            })

            .catch(err => {
                res.json({
                    error: "error posting user"
                });
            });
        } else {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            });
        }
    });
});

router.post("/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/", (req, res) => {
    // do your magic!
    db.find()
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

router.get("/:id", (req, res) => {
    // do your magic!
    const id = req.params.id;

    db.findById(id)

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

router.get("/:id/posts", (req, res) => {
    // do your magic!
});

router.delete("/:id", (req, res) => {
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
    // do your magic!
}

function validateUser(req, res, next) {
    // do your magic!
}

function validatePost(req, res, next) {
    // do your magic!
}

module.exports = router;