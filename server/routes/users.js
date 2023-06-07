const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
            let accessToken = createJWT(user.email, user._id, 3600);
            jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                if (decoded) {
                    res.status(200).json({
                        success: true,
                        token: accessToken,
                        message: user
                    })
                }
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