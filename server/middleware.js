const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const verifyToken = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(token)

    try {
        if (!token) {
            return res.status(403).json({ message: 'A token is required for authentication' })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = decoded;
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }

    return next();
}

module.exports = verifyToken;