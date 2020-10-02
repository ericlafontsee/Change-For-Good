module.exports = function(sequelize) {
    var UserEvent = sequelize.define("UserEvent", {}, { timestamps: false });
    
    return UserEvent;
};