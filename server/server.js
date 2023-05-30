require('dotenv').config();
const express = require('express');
const cors = require('cors')
const recipeRouter = require('./routes/recipes');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRouter);


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(PORT, () => console.log('Server Started'));