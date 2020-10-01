var db = require("../models");

module.exports = function(app) {
    app.get("/api/organization", function(req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Organization.findAll({ include: db.Event }).then(function(dbOrg) {
            res.json(dbOrg);
        });
    });

    app.get("/api/organization/:id", function(req, res) {
        // 2; Add a join to include all of the Author's Posts here
        db.Organization.findOne({
            where: {
                id: req.params.id
            },
            include: db.Event //automatically gets author assoiated with that id
        }).then(function(dbOrg) {
            res.json(dbOrg);
        });
    });

    app.post("/api/organization", function(req, res) {
        db.Organization.create(req.body).then(function(dbOrg) {
            res.json(dbOrg);
        });
    });

    app.delete("/api/organization/:id", function(req, res) {
        db.Organization.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbOrg) {
            res.json(dbOrg);
        });
    });

};