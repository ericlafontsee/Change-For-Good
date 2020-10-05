// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the login page
    if (req.user) {
      return res.render("userLanding");
    }
    return res.render("login");
  });

  //loads the user signup page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page??
    if (req.user) {
      return res.render("userLanding");
    }
    return res.render("userSignup");
  });

  //loads the organization sign up page
  app.get("/orgsignup", (req, res) => {
    // If the user already has an account send them to the org's page??
    if (req.user) {
      return res.render("orgLanding");
    }
    return res.render("orgSignup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/members", isAuthenticated, (req, res) => {
    if (req.user) {
      return res.render("userLanding");
    }
    return res.render("login");
  });

  app.get("/organization", isAuthenticated, (req, res) => {
    if (req.user) {
      return res.render("orgLanding");
    }
    return res.render("login");
  });

  app.get("/newevent", (req, res) => {
    // If the user already has an account send them to the org's page??
    if (req.user) {
      return res.render("createEvent");
    }
    return res.render("login");
  });
};
