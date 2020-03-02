const express   =   require('express')
const router    =   express.Router()
const{requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const{createProduct, productById, readProduct, delProduct, updateProduct, listProducts, listRelatedProd, listCategories, listBySearch, productPhoto} = require('../controllers/product')


//-------------------------- CRUD Methods -------------------------- 
router.get('/product/:productId', readProduct)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, createProduct)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, delProduct )
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct )
//------------------------------------------------------------------

router.get('/products', listProducts)
router.get('/products/related/:productId', listRelatedProd )
router.get('/products/categories', listCategories )
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', productPhoto)

// ---------------------- Middlewares Methods ----------------------

router.param('userId', userById)
router.param('productId', productById)

module.exports = router