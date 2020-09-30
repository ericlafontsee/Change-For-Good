module.exports = function(sequelize) {
    var UserEvents = sequelize.define("UserEvents", {}, { timestamps: false });
    User.belongsToMany(Events, { through: UserEvents });
    Events.belongsToMany(User, { through: UserEvents });

    return UserEvents;
};