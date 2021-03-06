    
const jwt               =   require('jsonwebtoken')
const expressJwt        =   require('express-jwt')
const {errorHandler}    =   require('../helpers/dbErrorHandler')
const User              =   require('../models/user')

/**
 * Represents a method to Sign Up a new User.
*/

exports.signup = (req, res) => {
    const user = new User(req.body)
    
    user.save((err, user) => {
        if(err){
            res.status(400).json({
                err: errorHandler(err)
           }) 
       }
        res.json({user})
   })
}

/**
 * Represents a method Sign In using JWT 
 */

exports.signin = (req, res) => {

    // find the user based on email

    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // if user is found make sure the email and password match
    
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email or password do not match'
            })
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })
        // return response with user and token to frontend client
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role } })
    })
}

/**
 * Represents a Method a Sign Out 
 */

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
}

// Middlewares 

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, 
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user){
        return res.status(403).json({
            error: "Access denied !"
        })
    }

    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({error : "Admin resources. Access denied !"})
    }
    next()
} 