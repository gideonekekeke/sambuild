const mongoose = require('mongoose')

const schema = mongoose.Schema({
title : {
    type : String
},

description : {
    type : String
},
image : {
    type : String
}
})

module.exports = mongoose.model('prod', schema)