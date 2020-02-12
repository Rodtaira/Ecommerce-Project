const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
   const user = new User(req.body)

   user.save((err, user) => {
       if(err){
           res.status(400).json({
               err: errorHandler(err)
           }) 
       }

       res.json({
            user
        })
   })
}