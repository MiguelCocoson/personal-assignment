const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('posts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid post id to find a post.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('posts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createpost = async (req, res) => {
  const post = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    post: req.body.post
  };
  const response = await mongodb.getDb().db().collection('posts').insertOne(post);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the post.');
  }
};

const updatepost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid post id to update a post.');
  }
  const userId = new ObjectId(req.params.id);
  const post = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    post: req.body.post
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('posts')
    .replaceOne({ _id: userId }, post);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the post.');
  }
};

const deletepost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid post id to delete a post.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('posts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the post.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createpost,
  updatepost,
  deletepost
};