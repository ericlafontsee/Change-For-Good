const db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the events
  app.get("/api/event", (req, res) => {
    db.Event.findAll({
      include: {
        model: db.Organization
        // attributes: { exclude: ["updatedAt"] } //FIX******
      }
      // attributes: { exclude: ["AuthId", "updatedAt"] } //FIX******
    }).then(dbEvent => {
      res.json(dbEvent);
    });
  });

  // Get route for retrieving a single Event
  app.get("/api/event/:id", (req, res) => {
    // 2. Add a join here to include the Organization who wrote the Event
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: db.Organization
    }).then(dbEvent => {
      console.log(dbEvent);
      res.json(dbEvent);
    });
  });

  // POST route for saving a new Event
  app.post("/api/event", (req, res) => {
    db.Event.create(req.body).then(dbEvent => {
      res.json(dbEvent);
    });
  });

  // DELETE route for deleting Events
  app.delete("/api/event/:id", (req, res) => {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbEvent => {
      res.json(dbEvent);
    });
  });

  // PUT route for updating Event
  app.put("/api/event", (req, res) => {
    db.Event.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbEvent => {
      res.json(dbEvent);
    });
  });
};
