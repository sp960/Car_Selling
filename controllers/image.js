const { Image } = require('../models');

// Create a new image
const createImage = async (req, res) => {
    try {
        const { carId, imageUrl } = req.body;
        const image = await Image.create({ carId, imageUrl });
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all images
const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get images by carId
const getImagesByCarId = async (req, res) => {
    try {
        const { carId } = req.params;
        const images = await Image.findAll({ where: { carId } });
        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found for this carId' });
        }
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get image by ID
const getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update image
const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { carId, imageUrl } = req.body;
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        image.carId = carId;
        image.imageUrl = imageUrl;
        await image.save();
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete image
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        await image.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getImagesByCarId,
    createImage,
    getAllImages,
    getImageById,
    updateImage,
    deleteImage
};
