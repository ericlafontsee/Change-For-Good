var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the events
    app.get("/api/event", function(req, res) {
        var query = {};
        if (req.query.author_id) {
            query.AuthorId = req.query.author_id;
        }
        // 1. Add a join here to include all of the Authors to these posts
        db.Event.findAll({
            where: query,
            include: {
                model: db.Organization,
                attributes: { exclude: ["updatedAt"] }  //FIX******
            },
            attributes: { exclude: ["AuthorId", "updatedAt"] }  //FIX******
        }).then(function(dbEvent) {
            res.json(dbEvent);
        });
    });

    // Get route for retrieving a single post
    app.get("/api/event/:id", function(req, res) {
        // 2. Add a join here to include the Author who wrote the Post
        db.Event.findOne({

            where: {
                id: req.params.id
            },
            include: db.Organization,


        }).then(function(dbEvent) {
            console.log(dbEvent);
            res.json(dbEvent);
        });
    });

    // POST route for saving a new post
    app.post("/api/event", function(req, res) {
        db.Event.create(req.body).then(function(dbEvent) {
            res.json(dbEvent);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/event/:id", function(req, res) {
        db.Event.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbEvent) {
            res.json(dbEvent);
        });
    });

    // PUT route for updating posts
    app.put("/api/event", function(req, res) {
        db.Event.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbEvent) {
            res.json(dbEvent);
        });
    });
};