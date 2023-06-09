const router = require('express').Router();

const{ getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtController')

// route for /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// routes for /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// routes for /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/').post(addReaction)

// routes for /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router