// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.render("../views/userLanding.handlebars");
    }
    res.render("../views/login.handlebars");
  });

  //loads the user signup page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page??
    if (req.user) {
      res.render("../views/userLanding.handlebars");
    }
    res.render("../views/userSignup.handlebars");
  });

  //loads the organization sign up page
  app.get("/orgsignup", (req, res) => {
    // If the user already has an account send them to the org's page??
    if (req.user) {
      res.render("../views/orgLanding.handlebars");
    }
    res.render("../views/orgSignup.handlebars");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/members", isAuthenticated, (req, res) => {
    if (req.user) {
      res.render("../views/userLanding.handlebars");
    } else {
      res.render("../views/login.handlebars");
    }
  });

  app.get("/organization", isAuthenticated, (req, res) => {
    if (req.user) {
      res.render("../views/orgLanding.handlebars");
    } else {
      res.render("../views/login.handlebars");
    }
  });

  app.get("/newevent", (req, res) => {
    // If the user already has an account send them to the org's page??
    if (req.user) {
      res.render("../views/createEvent.handlebars");
    }
  });
};
