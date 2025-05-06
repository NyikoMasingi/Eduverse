const {getForumChats, createForumChat} = require("../controller/forum_chat.controller")
const express = require('express')
const router = express.Router()


router.get('/forum/:forum_id', getForumChats);
router.post('/new', createForumChat)

module.exports = router;