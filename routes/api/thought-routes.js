const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');
// /api/thoughts/
router
  .route('/')
  .get(getAllThought)

// /api/thoughts/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
router
  .route('/:thoughtId/reactions/:userId')
  .post(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


module.exports = router;