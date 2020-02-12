const   express     =   require('express')
const   morgan      =   require('morgan')
const   bodyParser  =   require('body-parser')
const   cookieParser=   require('cookie-parser')
require('dotenv').config()
require('./db/mongoose')
const   userRoutes  =   require('./routes/user')

// app

const app = express()

// middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// routes

app.use('/api',userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

