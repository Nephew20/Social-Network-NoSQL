const router = require('express').Router();

const{ getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller')

// route for /api/users
router.route('/').get(getUsers).post(createUser);

// routre for /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router