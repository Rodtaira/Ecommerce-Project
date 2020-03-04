const express   =   require('express')
const router    =   express.Router()
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createCategory, readCategory, updateCategory, delCategory, listCategories, categoryById} = require('../controllers/category')

router.get('/category/:categoryId', readCategory)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, createCategory)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, delCategory)
router.get('/categories', listCategories);

router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router