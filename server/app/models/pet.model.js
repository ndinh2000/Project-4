module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pet", {
        pet_id: {
            type: Sequelize.STRING,
            primaryKey:true
        },
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        gender: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        message: {
            type: Sequelize.STRING
        },
        profile_picture: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        pet_type: {
            type: Sequelize.STRING
        }
    });

    return Pet;
};
