const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image');

// Route to create a new image
router.post('/', imageController.createImage);

// Route to get all images
router.get('/', imageController.getAllImages);

// Route to get an image by ID
router.get('/:id', imageController.getImageById);

// Route to update an image by ID
router.put('/:id', imageController.updateImage);

// Route to delete an image by ID
router.delete('/:id', imageController.deleteImage);

// Route to get images by carId
router.get('/carImage/:carId', imageController.getImagesByCarId);

module.exports = router;
