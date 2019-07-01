let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let mongoose = require('mongoose')

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (req, res, next)=>{
    res.json("home")
})

app.listen(secret.port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Working on port" + secret.port)
    }
})
