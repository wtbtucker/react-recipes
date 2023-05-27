const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

module.exports = router


const getRecipe = async (req, res, next) => {
    let recipe;
    try {
        recipe = await Recipe.findById(req.params.id)
        if (recipe == null) {
            return res.status(403).json({ message: 'Cannot find recipe'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.recipe = recipe
    next();
}


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
router.get('/:id', getRecipe, (req, res) => {
    res.send(res.recipe);
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


router.put('/:id', getRecipe, async (req, res) => {
    if (req.body.title != null) {
        res.recipe.title = req.body.title
    }
    if (req.body.ingredients != null) {
        res.recipe.ingredients = req.body.ingredients
    }
    if (req.body.instructions != null) {
        res.recipe.instructions = req.body.instructions
    }
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate({ _id: req.params.id }, res.recipe);
        res.json(updatedRecipe);
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

