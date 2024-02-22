const models = require("../models")

const save = async (req, res) => {
            // Creating the car entry in the database
            const newCar = {
                        make: req.body.make,
                        model: req.body.model,
                        year: req.body.year,
                        price: req.body.price,
                        mileage: req.body.mileage,
                        fuel_type: req.body.fuel_type,
                        transmission_type: req.body.transmission_type,
            };

            models.Car.create(newCar).then(result => {
                        res.status(201).json({
                                    message: "Car Updated succesfully",
                                    result: result
                        })
            }).catch(err => {
                        res.status(500).json({
                                    message: "Something went wrong",
                                    err: err
                        })
            })
}

const showById = (req, res) => {
            const id = req.params.id;

            models.Car.findByPk(id)
                        .then(result => {
                                    if (result) {
                                                res.status(200).json(result);
                                    } else {
                                                res.status(404).json({
                                                            message: "Car not found",
                                                });
                                    }
                        })
                        .catch(err => {
                                    res.status(500).json({
                                                message: "Something went wrong",
                                                error: err,
                                    });
                        });
};

const showAll = (req, res) => {
            models.Car.findAll()
                        .then(result => {
                                    res.status(200).json(result);
                        })
                        .catch(err => {
                                    res.status(500).json({
                                                message: "Something went wrong",
                                                error: err,
                                    });
                        });
};

const update = (req, res) => {
            const id = req.params.id;

            const updateCar = {
                        make: req.body.make,
                        model: req.body.model,
                        year: req.body.year,
                        price: req.body.price,
                        mileage: req.body.mileage,
                        fuel_type: req.body.fuel_type,
                        transmission_type: req.body.transmission_type,
                        title: req.body.title,
                        content: req.body.content,
                        imageUrl: req.body.imageUrl,
            };
            models.Car.update(updateCar, { where: { id: id } })
                        .then(result => {
                                    res.status(200).json({
                                                message: "Car updated successfully",
                                                car: updateCar,
                                    });
                        })
                        .catch(err => {
                                    res.status(500).json({
                                                message: "Something went wrong",
                                                error: err,
                                    });
                        });
};

const destroy = (req, res) => {
            const id = req.params.id;

            models.Car.destroy({ where: { id: id } })
                        .then(result => {
                                    res.status(200).json({
                                                message: "Car deleted successfully",
                                    });
                        })
                        .catch(err => {
                                    res.status(500).json({
                                                message: "Something went wrong",
                                                error: err,
                                    });
                        });
};

const { Car } = require('../models');

// Get cars by make
const getCarsByMake = async (req, res) => {
    try {
        const { make } = req.params;
        const cars = await Car.findAll({ where: { make } });
        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No cars found for this make' });
        }
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
            save : save,
            showById: showById,
            showAll: showAll,
            update: update,
            destroy: destroy,
            getCarsByMake
};
       