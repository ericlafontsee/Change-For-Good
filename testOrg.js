const db = require('./models');
const Fakerator = require('fakerator');
const fakerator = Fakerator();
const items = [];
const { v4: uuidv4 } = require('uuid');

for (let i = 0; i < 3; i++) {
  const entity = fakerator.entity.company();
  const obj = {};
  obj.id = uuidv4();
  obj.name = entity.name;
  obj.email = entity.email;
  obj.website = entity.website;
  obj.password = "abc123";
  items.push(obj);
}
console.log(items);

db.sequelize.sync().then(() => {
  console.log(items);
  db.Organization.bulkCreate(items);
});
