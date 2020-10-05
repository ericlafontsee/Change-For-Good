const db = require("../models");
const passport = require("../config/passport");
// const { UUIDV4 } = require("sequelize/types");
const { v4: uuidv4 } = require("uuid");

module.exports = function(app) {
  app.post(
    "/api/orglogin",
    passport.authenticate("local-org", {
      successRedirect: "/organization",
      failureRedirect: "/"
    }),
    (req, res) => {
      // Sending back a password, even a hashed password, isn't a good idea
      console.log("you hit api/orglogin route");
      res.json({
        // email: req.Organization.email,
        email: req.user.email,
        // id: req.Organization.id
        id: req.user.id
      });
    }
  );

  // Route for signing up Organization
  app.post("/api/orgsignup", (req, res) => {
    console.log("testing 1,2,3");
    db.Organization.create({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      website: req.body.website,
    })
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //finds all organizations
  app.get("/api/organizations", (req, res) => {
    // A join to include all of each Organization's Events
    db.Organization.findAll({
      include: db.Event,
    }).then((dbOrg) => {
      res.json(dbOrg);
    });
  });

  //Gets one Organization with this ID
  app.get("/api/organizations/:id", (req, res) => {
    // A join to include all of the Organization's Events here
    db.Organization.findOne({
      where: {
        id: req.params.id,
      },
      include: db.Event, // gets all Events assoiated with that Organization
    }).then((dbOrg) => {
      res.json(dbOrg);
    });
  });
};
