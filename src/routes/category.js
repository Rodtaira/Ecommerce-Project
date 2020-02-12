const express   =   require('express')
const router    =   express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createCategory} = require('../controllers/category')


router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, createCategory)

router.param('userId', userById)

module.exports = router