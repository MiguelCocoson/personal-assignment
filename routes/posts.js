
const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const validation = require('../middleware/validate');

router.get('/', postsController.getAll);

router.get('/:id', postsController.getSingle);

router.post('/', validation.savePost, postsController.createpost);

router.put('/:id', validation.savePost, postsController.updatepost);

router.delete('/:id', postsController.deletepost);

module.exports = router;