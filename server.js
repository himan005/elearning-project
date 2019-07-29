// load the thing we needed
let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let mongoose = require('mongoose')
let ejs = require('ejs')
let engine = require('ejs-mate')
let passport = require('passport')

let app = express()

const secret = require('./config/secret')

mongoose.connect(secret.database, {useNewUrlParser: true}, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("connected to database")
    }
})


// set the directory for static files
app.use(express.static(__dirname + '/public'))

// set the view engine to ejs
app.engine('ejs', engine)
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/main')(app)

app.listen(secret.port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Working on port" + secret.port)
    }
})
