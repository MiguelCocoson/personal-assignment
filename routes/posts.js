
const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const validation = require('../middleware/validate');

router.get('/', postsController.getAll);

router.get('/:id', postsController.getSingle);

router.post('/', validation.savePost, postsController.createPost);

router.put('/:id', validation.savePost, postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;