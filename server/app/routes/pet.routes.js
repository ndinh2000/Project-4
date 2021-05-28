module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", pets.create);

    // Retrieve all Tutorials
    router.get("/", pets.findAll);

    // Retrieve all published Tutorials
    router.get("/published", pets.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:pet_id", pets.findOne);

    // Update a Tutorial with id
    router.put("/:pet_id", pets.update);

    // Delete a Tutorial with id
    router.delete("/:pet_id", pets.delete);

    // Delete all Tutorials
    router.delete("/", pets.deleteAll);

    app.use('/api/pets', router);
};
