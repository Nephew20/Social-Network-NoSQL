const router = require('express').Router();

const{ getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController')

// route for /api/users
router.route('/').get(getUsers).post(createUser);

// routes for /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// routes for /api/users/:userId/friends/:friendId
// router.route('/:userId/friends').post(addFriend)
// router.route('/:userId/friends/:firendId').delete(removeFriend)


router.route('/:userId/friends/:firendId').post(addFriend).delete(removeFriend)
module.exports = router