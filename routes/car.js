const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars');
// const authMiddleware = require('../middleware/auth');

// Create a new car
router.post('/newCar', carController.save);

// Get all cars
router.get('/newCar', carController.showAll);

// Get car by ID
router.get('/:id', carController.showById);

// Route to filter cars by make
router.get('/make/:make', carController.getCarsByMake);

// Update car by ID
router.put('/:id', carController.update);

// Delete car by ID
router.delete('/:id', carController.destroy);

module.exports = router;
