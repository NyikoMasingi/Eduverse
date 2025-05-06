const {getAllForums, createNewForum} = require("../controller/forum.controller")
const express = require('express')
const router = express.Router()



router.get('/all',getAllForums)
router.post('/new', createNewForum)




module.exports = router;