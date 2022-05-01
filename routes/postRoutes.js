const express = require('express');
const router = express.Router();
const getPostController = require('../controllers/getPostController');
const searchPostController = require('../controllers/searchPostController');

router.route('/p').get(getPostController.getAllPosts);
router.route('/s').get(searchPostController.findPosts);

module.exports = router;