const repository = require('../../infra/repositories/user.repository.memory');
const bcrypt = require('bcryptjs');


function listUsers({ page = 1, pageSize = 10 } = {}) {
  return repository.findAll({ page, pageSize });
}


function getUserById(id) {
    return repository.findById(id);
}


function createUser({ email, name, password }) {
    if (repository.findByEmail(email)) {
        throw new Error('Email já existe');
    }

    return repository.createUser({ email, name, password });
}


function updateUser(id, data) {
    console.log(id, data);
    return repository.updateUser(id, data);
}


function deleteUser(id) {
    return repository.deleteUser(id);
}


function validateCredentials(email, password) {
    const user = repository.findByEmail(email);
    if (!user) return null;
    const valid = bcrypt.compareSync(password, user.passwordHash);
    return valid ? user : null;
}


module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    validateCredentials,
};