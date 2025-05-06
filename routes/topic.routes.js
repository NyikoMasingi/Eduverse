const express = require('express');
const router = express.Router();
const {getAllTopics, createNewTopic, addToFavourite, removeFromFavourite, getProfileTopics, deleteTopic} = require('../controller/topic.controller')

router.get('/all/:course_id', getAllTopics)
router.post('/new', createNewTopic)


// topic favourites
router.post('/favourite', addToFavourite)
router.delete('/favourite', removeFromFavourite)


router.get('/profile/:profile_id',getProfileTopics)
router.delete('/topic',deleteTopic)

module.exports = router;