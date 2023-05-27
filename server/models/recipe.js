const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ingredientSchema = new Schema({ 
    ingredient: String, 
    units: String, 
    quantity: String
});

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [ingredientSchema],
        required: true
    },
    instructions: {
        type: [String],
        required: true

    },
    creationDate: {
        
    },
});

module.exports = mongoose.model('recipe', recipeSchema);