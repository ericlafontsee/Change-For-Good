const bcrypt = require("bcryptjs");

// Creating our Organization model
module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define("Organization", {
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Organization.associate = models => {
        // Associating Organization with Events
        Organization.hasMany(models.Event, {
            onDelete: "cascade" 
        });
    };
    // Creating a custom method for our Organization model. This will check if an unhashed password entered by the Organization can be compared to the hashed password stored in our database
    Organization.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the Organization Model lifecycle
    // In this case, before a Organization is created, we will automatically hash their password
    Organization.addHook("beforeCreate", function(Organization) {
        Organization.password = bcrypt.hashSync(
            Organization.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return Organization;
};