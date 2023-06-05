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
});


// Get one recipe
router.get('/:id', async (req, res) => {
    let recipe;
    try {
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null) {
            res.status(403).json({ message: 'Cannot find recipe'})
        }
        res.status(200).json(recipe)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    });
    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate({ _id: req.params.id }, req.body, { returnDocument: 'after' });
        // updates the document but sends the old version in the json response
        res.status(201).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.delete('/:id', async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id })
        res.json({ message: 'Deleted recipe' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

