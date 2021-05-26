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
    router.get("/:id", pets.findOne);

    // Update a Tutorial with id
    router.put("/:id", pets.update);

    // Delete a Tutorial with id
    router.delete("/:id", pets.delete);

    // Delete all Tutorials
    router.delete("/", pets.deleteAll);

    app.use('/api/pets', router);
};
