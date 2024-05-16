const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.TOKEN_KEY;

function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '1h' });
}

function getToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return token;
}

function validateToken(req, res, next) {
    const token = getToken(req);
 
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
 
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, getToken, validateToken };