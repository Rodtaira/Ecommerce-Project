const {errorHandler} = require('../helpers/dbErrorHandler')

module.exports = function ifError(err, res){

        return res.status(400).json({
            error: errorHandler(err)
        })   
}