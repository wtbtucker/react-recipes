const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

module.exports = router

const createJWT = (email, userId, duration) => {
    const payload = {
        email,
        userId,
        duration
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: duration
    });
}

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    
    try {
        if (await user.comparePassword(req.body.password)) {
            let token = createJWT(user.email, user._id, 3600);
            return res.status(200).json({
                message: 'Login successful',
                token
            })
        } else {
            res.send('Incorrect username or password')
        }
          
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req, res) => {

    if (req.body.password !== req.body.confirm) {
        res.status(400).json({ message: 'Password must match password confirmation'})
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})