const db = require("../models");

module.exports = function(app) {
  //finds all organizations
  app.get("/api/organization", (req, res) => {
    // A join to include all of each Organization's Events
    db.Organization.findAll({
      include: db.Event
    }).then(dbOrg => {
      res.json(dbOrg);
    });
  });

  //Gets one Organization with this ID
  app.get("/api/organization/:id", (req, res) => {
    // A join to include all of the Organization's Events here
    db.Organization.findOne({
      where: {
        id: req.params.id
      },
      include: db.Event //automatically gets all Events assoiated with that Organization
    }).then(dbOrg => {
      res.json(dbOrg);
    });
  });

  //Creates a new organization
  app.post("/api/organization", (req, res) => {
    db.Organization.create(req.body).then(dbOrg => {
      res.json(dbOrg);
    });
  });

  //Deletes an organization at this ID
  app.delete("/api/organization/:id", (req, res) => {
    db.Organization.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbOrg => {
      res.json(dbOrg);
    });
  });
};
