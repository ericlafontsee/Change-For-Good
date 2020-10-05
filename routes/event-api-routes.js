const db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the events
  app.get("/api/events", (req, res) => {
    db.Event.findAll({
      include: {
        model: db.Organization
        // attributes: { exclude: ["updatedAt"] } FIX******
      }
    }).then(dbEvent => {
      return res.json(dbEvent);
    });
  });

  // Get route for retrieving a single Event
  app.get("/api/events/:id", (req, res) => {
    // A join here to include the Organization who wrote the Event
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: db.Organization
    }).then(dbEvent => {
      console.log(dbEvent);
      return res.json(dbEvent);
    });
  });

  // POST route for saving a new Event
  app.post("/api/events", (req, res) => {
    db.Event.create(req.body).then(dbEvent => {
      return res.json(dbEvent);
    });
  });

  // DELETE route for deleting Events
  app.delete("/api/events/:id", (req, res) => {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbEvent => {
      return res.json(dbEvent);
    });
  });

  // PUT route for updating Event
  app.put("/api/events", (req, res) => {
    db.Event.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbEvent => {
      return res.json(dbEvent);
    });
  });
};
