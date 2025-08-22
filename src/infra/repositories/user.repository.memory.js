const bcrypt = require('bcryptjs');
let idCounter = 1;
let users = [];

const now = new Date();
users.push({
    id: idCounter++,
    email: 'admin@sps.com',
    name: 'Admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
    createdAt: now,
    updatedAt: now,
},
{
    id: idCounter++,
    email: 'admin@sps1.com',
    name: 'Gabriel admin 1',
    passwordHash: bcrypt.hashSync('admin123', 10),
    createdAt: now,
    updatedAt: now,
},
{
    id: idCounter++,
    email: 'admin@sps2.com',
    name: 'Gabriel admin 2',
    passwordHash: bcrypt.hashSync('admin123', 10),
    createdAt: now,
    updatedAt: now,
}
,{
    id: idCounter++,
    email: 'admin@sps3.com',
    name: 'Gabriel admin 3',
    passwordHash: bcrypt.hashSync('admin123', 10),
    createdAt: now,
    updatedAt: now,
});


function toPublic(user) {
    const { passwordHash, ...rest } = user;
    return { ...rest };
}


function findAll({ page = 1, pageSize = 10 } = {}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = users.slice(start, end).map(toPublic);
  const total = users.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: items,
    pagination: {
        page,
        pageSize,
        total,
        totalPages
    }
  };
}


function findById(id) {
    const user = users.find(user => user.id === id);
    return user ? toPublic(user) : null;
}


function findByEmail(email) {
    return users.find(user => user.email === email) || null;
}


function createUser({ email, name, password }) {
    const now = new Date();
    const user = {
        id: idCounter++,
        email,
        name,
        passwordHash: bcrypt.hashSync(password, 10),
        createdAt: now,
        updatedAt: now,
    };

    users.push(user);
    return toPublic(user);
}


function updateUser(id, data) {
    const user = users.find(user => user.id === id);
    if (!user) {
        return null;
    }

    if (data.email){ 
        user.email = data.email;
    }

    if (data.name) {
        user.name = data.name;
    }

    if (data.password) {
        user.passwordHash = bcrypt.hashSync(data.password, 10);
    }
    user.updatedAt = new Date();

    return toPublic(user);
}


function deleteUser(id) {
    const idx = users.findIndex(user => user.id === id);
    if (idx === -1) {
        return false;
    }

    users.splice(idx, 1);
    return true;
}


module.exports = {
    users,
    findAll,
    findById,
    findByEmail,
    createUser,
    updateUser,
    deleteUser,
};