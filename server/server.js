const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors')
const recipeRouter = require('./routes/recipes');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const sessions = require('express-session');


dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);

// MIDDLEWARE
const verifyToken = (req, res, next) => {
    const token = String(req.headers.authorization)
        .replace(/^bearer|^jwt/i, "")
        .replace(/^\s+|\s+$/gi, "");

    try {
        if (!token) {
            return res.status(403).json({ message: 'A token is required for authentication' })
        }

        const decoded = jwt.verify(token, proccss.env.TOKEN_SECRET);
        req.userData = decoded;
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    return next();
}

const clientP = mongoose.connect(process.env.DATABASE_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(m => m.connection.getClient());


const oneDay = 1000*60*60*24 // One day in milliseconds
app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    store: MongoStore.create({
        clientPromise: clientP,
    }),
    cookie: { maxAge: oneDay },
    resave: false
}));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(PORT, () => console.log('Server Started'));