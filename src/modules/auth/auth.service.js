const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');
const userService = require('../users/user.service');
const { findById } = require('../../infra/repositories/user.repository.memory');

function login(email, password) {
    const user = userService.validateCredentials(email, password);
    if (!user) {
        return null;
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
}

function getAuthUser(token) {
    if (!token) return null;

    try {
        const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenString, JWT_SECRET);

        const user = findById(decoded.id);
        return user || null;
    } catch (err) {
        return null;
    }
}

module.exports = { login, getAuthUser };