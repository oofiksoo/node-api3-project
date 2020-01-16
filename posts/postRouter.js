const db = require("./postDb.js");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    // do your magic!
    db.get()

    .then(posts => {
        res.status(200).json(posts);
    })

    .catch(error => {
        console.log("error on GET /api/posts/", error);

        res.status(500).json({
            errorMessage: "The posts information could not be retrieved."
        });
    });
});

router.get("/:id", (req, res) => {
    // do your magic!
    const id = req.params.id;

    db.getById(id)

    .then(post => {
        if (post.length !== 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            });
        }
    })

    .catch(error => {
        console.log("error on GET /api/posts/:id", error);

        res.status(500).json({
            errorMessage: "The post information could not be retrieved."
        });
    });
});

router.delete("/:id", (req, res) => {
    // do your magic!
    const id = req.params.id;

    db.remove(id)

    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            });
        }
    })

    .catch(error => {
        console.log("error on DELETE /api/posts/:id", error);

        res.status(500).json({
            errorMessage: "The post could not be removed"
        });
    });
});

router.put("/:id", (req, res) => {
    // do your magic!
    const id = req.params.id;

    const data = req.body;

    if (!data.title || !data.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    } else {
        db.update(id, data)

        .then(post => {
            if (post) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                });
            }
        })

        .catch(error => {
            console.log("error on PUT /api/posts/:id", error);

            res.status(500).json({
                errorMessage: "The post information could not be modified."
            });
        });
    }
});

// custom middleware

function validatePostId(req, res, next) {
    // do your magic!
    const id = req.params.id;

    db.getById(id)

    .then(post => {
        if (!post) {
            res.status(400).json({ message: "Invalid post id." });
        } else {
            req.post = post;

            next();
        }
    })

    .catch(err => {
        console.log(err);

        res.status(500).json({ message: "Error retrieving post id." });
    });
}

module.exports = router;