const db = require("./models");
db.sequelize.sync().then(() => {
  db.User.findAll({
    include: {
      model: db.Event,
      attributes: {
        include: db.Organization
      }
    }
  }).then(result => {
    console.log(result);
  });
});
