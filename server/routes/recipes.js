const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

module.exports = router

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Get one recipe
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})

router.post('/', (req, res) => {

})

router.patch(':/id', (req, res) => [

])

router.delete(':/id', (req, res) => {

})

