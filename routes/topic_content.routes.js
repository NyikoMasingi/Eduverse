const express = require('express');
const router = express.Router();
const {getAllContent, createTopicContent} = require('../controller/topic_content.controller')


router.get('/all/:topic_id&:profile_id', getAllContent)
router.post('/create', createTopicContent)







module.exports = router;
