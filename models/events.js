const uuid = require("uuid");

module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        description: DataTypes.TEXT,
        eventDate: DataTypes.DATE,
    });

    Events.associate = function(models) {
        // Associating individuals (User) with Events
        Events.hasMany(models.User, {
            through: models.UserEvents
        });
        //Associating the Organization that created the Event
        Events.belongsTo(models.Organization, {
            foreignKey: {
                allowNull: false
            },
            // When an Organization is deleted, also delete any associated Events
            onDelete: "cascade"
        });
    };

    return Events;
};