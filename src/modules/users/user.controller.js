const service = require('./user.service');


function listUsers(req, res, next) {
    try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = service.listUsers({ page, pageSize });
    res.json(result);
    } catch (err) {
    next(err);
    }
}


function getUser(req, res, next) {
    try {
        const user = service.getUserById(Number(req.params.id));
        if (!user) {  
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        res.json({ data: user });
    } catch (err) {
        next(err);
    }
}


function createUser(req, res, next) {
    try {
        const user = service.createUser(req.body);
        res.status(201).json({ data: user});
    } catch (err) {
        next(err);
    }
}


function updateUser(req, res, next) {
    try {
        const user = service.updateUser(Number(req.params.id), req.body);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ data: user });
    } catch (err) {
        next(err);
    }
}


function deleteUser(req, res, next) {
    try {
        const deleted = service.deleteUser(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ data: "Usuário deletado com sucesso" });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};