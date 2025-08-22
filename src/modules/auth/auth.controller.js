const service = require('./auth.service');

function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = service.login(email, password);
        if (!token) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.json({ token });
    } catch (err) {
        next(err);
    }
}

function getAuthUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const user = service.getAuthUser(authHeader);
        if (!user) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        res.json({ data: user });
    } catch (err) {
        next(err);
    }
}

module.exports = { login, getAuthUser };