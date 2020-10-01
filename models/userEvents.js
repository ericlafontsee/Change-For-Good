module.exports = function(sequelize) {
    var UserEvent = sequelize.define("UserEvent", {}, { timestamps: false });
    UserEvent.associate = function(models){
        // UserEvent.hasMany(models.Event);
        // UserEvent.hasMany(models.User);
    };
    return UserEvent;
};