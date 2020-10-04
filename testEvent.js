const db = require("./models");
const Fakerator = require("fakerator");
const fakerator = Fakerator();
const { v4: uuidv4 } = require("uuid");
const testEvents = [];

db.sequelize.sync().then(() => {
  db.Organization.findAll({}).then(results => {
    for (let i = 0; i < 10; i++) {
      const random = Math.floor(Math.random() * results.length);
      const randomOrg = JSON.parse(JSON.stringify(results[random]));
      const obj = {};
      obj.id = uuidv4();
      obj.title = fakerator.lorem.word();
      obj.description = fakerator.lorem.sentence();
      obj.eventDate = fakerator.date.future(1, "2020-10-12");
      obj.OrganizationId = randomOrg.id;
      testEvents.push(obj);
    }

    console.log(testEvents);

    db.Event.bulkCreate(testEvents);
  });
});
