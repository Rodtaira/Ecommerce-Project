const express   =   require('express')
const router    =   express.Router()
const{requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const{createProduct, productById, readProduct, delProduct, updateProduct} = require('../controllers/product')

router.get('/product/:productId', readProduct)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, createProduct)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, delProduct )
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct )

router.param('userId', userById)
router.param('productId', productById)

module.exports = router