const express = require('express');
const router = express.Router();
const userController = require('../modules/users/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.use(authMiddleware);


router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;