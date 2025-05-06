const express = require('express')
const router = express.Router();
const {getProfile} = require('../controller/profile.controller')



router.get('/:id', getProfile)
//router.put('/update', updateProfile)



module.exports = router;
