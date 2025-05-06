const express = require('express');
const router = express.Router();
const {uploadVideo, retrieveVideo,getAllVideoInfo,} = require("../controller/video.controller");


router.post('/new', uploadVideo)

router.get('/get/:course_id/:video_key', retrieveVideo)
router.get('/all/:course_id', getAllVideoInfo)
//router.get('/test', generatePresignedUrl)


module.exports = router;
