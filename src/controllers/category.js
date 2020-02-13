const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler')


// Middlewares

exports.categoryById = (req, res, next, id) => {


    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(404).json({
                error: 'The category does not exist'
            })
        }

        req.category = category
        next()
    })
}

// CRUD Methods

exports.createCategory = (req, res) => {

    const category  = new Category(req.body)
    category.save((err, data) => {
        if(err){
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.readCategory = (req, res) => {
    return res.json(req.category)
}

exports.updateCategory = (req, res) => {

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}

exports.delCategory = (req, res) => {
const category = req.category
    Category.find({ category }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            })
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json({
                    message: 'Category deleted'
                })
            })
        }
    })
}

exports.listCategories = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}