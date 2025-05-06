const { createAccount, loginMobile, updatePassword, updateProfile } = require('../controller/auth.controller')
const express = require('express')

const router = express.Router()



router.post('/create/',createAccount)
router.post('/mobile/',loginMobile)
router.put('/password', updatePassword)
router.put('/profile', updateProfile)



module.exports = router;
