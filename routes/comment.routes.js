const express = require('express');
const router = express.Router();
const {createComment, getVideoComments} = require('../controller/comment.controller');



router.post('/', createComment)
router.get('/video/:id', getVideoComments)



module.exports = router;







