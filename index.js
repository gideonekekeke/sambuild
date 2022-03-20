require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 9090
const cors = require('cors')

// const url = 'mongodb://localhost/olorundaDB'



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('connected successfully')
}).catch((err)=>{
    console.log('error occure')
})

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('my api is ready for consumtion....')
})

app.use(cors({origin : '*'}))

app.use('/api', require('./Route'))



app.listen(port, ()=>{
    console.log('listeing on port', + {port})
})