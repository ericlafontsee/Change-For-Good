const db = require("./models");
const Fakerator = require("fakerator");
const fakerator = Fakerator();
const testUsers = [];
const { v4: uuidv4 } = require("uuid");

for (let i = 0; i < 10; i++) {
  const obj = {};
  obj.id = uuidv4();
  obj.name = fakerator.names.name();
  obj.email = fakerator.internet.email();
  obj.password = "abc123";
  testUsers.push(obj);
}

console.log(testUsers);

db.sequelize.sync().then(() => {
  console.log(testUsers);
  db.User.bulkCreate(testUsers);
});
