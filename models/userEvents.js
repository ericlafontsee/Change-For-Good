const uuid = require("uuid");
module.exports = function(sequelize, DataTypes) {
    var userEvents = sequelize.define("userEvents", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },

        orgName: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        event_date: DataTypes.DATE,
        website: DataTypes.STRING

    });

    userEvents.associate = function(models) {
        userEvents.hasMany(models.User, {
            onDelete: "cascade"
        });
    };

    return userEvents;
};