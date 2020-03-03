const   express             =   require('express')
const   morgan              =   require('morgan')
const   bodyParser          =   require('body-parser')
const   cookieParser        =   require('cookie-parser')
const   expressValidator    =   require('express-validator')
const   cors                =   require('cors')
require('dotenv').config()
require('./db/mongoose')
const   authRoutes      =   require('./routes/auth')
const   userRoutes      =   require('./routes/user')
const   categoryRoutes  =   require('./routes/category')
const   productRoutes   =   require('./routes/product')

// App

const app = express()

// Middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// Routes

app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

// Run Server 

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app

