const db = require("../models");
const Pet = db.pets;
const Op = db.Sequelize.Op;

// Create and Save a new Pet
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Pet
    const pet = {
        pet_id: req.body.pet_id,
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        category:req.body.category,
        price:req.body.price,
        message:req.body.message,
        profile_picture:req.body.profile_picture,
        // title: req.body.title,
        // description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Pet in the database
    Pet.create(pet)
        //Error here?
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
    console.log("findAll")
    const name = req.query.name;
    const gender = req.query.gender;
    const category = req.query.category;
    console.log(name, gender, category)

    // var condition = {
    //     name: "",
    //     gender: "",
    //     category: ""
    // }
    // if (name)
    //     condition.name = { [Op.like]: `%${name}%` }
    // if (gender)
    //     condition.gender = { [Op.like]: `%${gender}%` }
    // if (category)
    //     condition.category = { [Op.like]: `%${category}%` }

    var condition = {
      [Op.and]: [
        {
          name: name ? {
            [Op.like]: `%${name}%`
          } : {
            [Op.like]: `%`
          }
        },
        {
          gender: gender ? gender : {
            [Op.like]: `%`
          }
        },
        {
            category: category ? category : {
                [Op.like]: `%`
            }
        //   category: category ? {
        //     [Op.like]: `%${category}%`
        //   } : {
        //     [Op.like]: `%`
        //   }
        }
      ]
    }

    console.log(condition)

    // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    // var condition = {
    //     name: { [Op.like]: `%${name}%` },
    //     gender: { [Op.like]: `%${gender}%` },
    //     category: { [Op.like]: `%${category}%` },
    // };

    Pet.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pets."
            });
        });
};

// Find a single Pet with an id
exports.findOne = (req, res) => {
    const pet_id = req.params.pet_id;
    console.log(req.params)
    console.log("findOne" + pet_id)
    // console.log("findOne")

    // Pet.findOne({
    //     where: {
    //         pet_id: pet_id
    //     },
    // }).then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error retrieving Pet with pet_id=" + pet_id
    //         });
    //     });

    Pet.findByPk(pet_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pet with pet_id=" + pet_id
            });
        });
};

exports.findGender = (req, res) => {
    const pet_gender = req.params.gender;
    console.log(req.params)
    console.log("findGender" + pet_gender)

    Pet.findByPk(pet_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pet with pet_id=" + pet_id
            });
        });
};

// Update a Pet by the id in the request
exports.update = (req, res) => {
    const pet_id = req.params.pet_id;

    Pet.update(req.body, {
        where: { pet_id: pet_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pet was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pet with pet_id=${pet_id}. Maybe Pet was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pet with pet_id=" + pet_id
            });
        });
};

// Delete a Pet with the specified id in the request
exports.delete = (req, res) => {
    const pet_id = req.params.pet_id;

    Pet.destroy({
        where: { pet_id: pet_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pet was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pet with pet_id=${pet_id}. Maybe Pet was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pet with pet_id=" + pet_id
            });
        });
};

// Delete all Pets from the database.
exports.deleteAll = (req, res) => {
    Pet.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pet were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all pets."
            });
        });
};

// find all published Pet
exports.findAllPublished = (req, res) => {
    Pet.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pets."
            });
        });
};
