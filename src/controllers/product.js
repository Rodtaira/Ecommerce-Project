const   formidable      =   require('formidable') 
const   _               =   require('lodash')
const   fs              =   require('fs') 
const   {errorHandler}  =   require('../helpers/dbErrorHandler')
const   Product         =   require('../models/product')
const   ifError         =   require('../utils/ifError')


// Middlewares methods 

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product
        next()
    })
}

/** CRUD Methods
 * 
 * @param {*} req 
 * @param {*} res 
 */ 

// Read a product 

exports.readProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
} 

//Delete a product

exports.delProduct = (req, res) => {
    let product = req.product
    product.remove((err) => {
        if(err){
            return ifError(err, res)
        }
        res.json({
            "message": "Product deleted succesfully"
        })
    })
}

// Update a product 

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, updated_fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        // check for all fields 
        const {name, description, price, category, quantity, shipping} = updated_fields
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            res.status(400).json({
                error: "All fields are required"
            })
        }

        let product = req.product

        product = _.extend(product, updated_fields)

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be less than 1 MB in size"
                })
            }
            product.photo.data          =   fs.readFileSync(files.photo.path)
            product.photo.contentType   =   files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }

            res.json(result)
        })
    })
}

// Create new product  

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        // check for all fields 
        const {name, description, price, category, quantity, shipping} = fields
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            res.status(400).json({
                error: "All fields are required"
            })
        }

        let product = new Product(fields)

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be less than 1 MB in size"
                })
            }
            product.photo.data          =   fs.readFileSync(files.photo.path)
            product.photo.contentType   =   files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

/**
 * sell / arrival
 * by sell: /products?sortBy=sold&order=desc&limit=4
 * by arrival: /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

 exports.listProducts = (req, res) => {
    let order   =   req.query.order ? req.query.order : 'asc'
    let sortBy  =   req.query.sortBy ? req.query.sortBy : '_id'
    let limit   =   req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.send(products)
        })
 }