const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/orglogin", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.Organization.email,
      id: req.Organization.id
    });
  });

  // Route for signing up Organization
  app.post("/api/orgsignup", (req, res) => {
    db.Organization.create({
      name: req.body.name,
      website: req.body.website,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/orglogin");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //finds all organizations
  app.get("/api/organization", (req, res) => {
    // A join to include all of each Organization's Events
    db.Organization.findAll({
      include: db.Event,
    }).then((dbOrg) => {
      res.json(dbOrg);
    });
  });

  //Gets one Organization with this ID
  app.get("/api/organization/:id", (req, res) => {
    // A join to include all of the Organization's Events here
    db.Organization.findOne({
      where: {
        id: req.params.id,
      },
      include: db.Event, //automatically gets all Events assoiated with that Organization
    }).then((dbOrg) => {
      res.json(dbOrg);
    });
  });


  // //Creates a new organization
  // app.post("/api/organization", (req, res) => {
  //   db.Organization.create(req.body).then((dbOrg) => {
  //     res.json(dbOrg);
  //   });
  // });

};

