
const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts.js');

router.get('/', postsController.getAll);

router.get('/:id', postsController.getSingle);

router.post('/', postsController.createPost);

router.put('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;