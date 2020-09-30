module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        orgName: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        event_date: DataTypes.DATE,
        website: DataTypes.STRING

    });

    Events.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Events.hasMany(models.User, {
            onDelete: "cascade" //when the event is deleted so will the user
        });
    };

    return Events;
};