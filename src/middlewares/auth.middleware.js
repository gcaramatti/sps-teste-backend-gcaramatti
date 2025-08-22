const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');


function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}


module.exports = authMiddleware;