const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productoSchema = new Schema({
    marca: {
        type: String,
        required: true,
    },
    modelo:{
        type: String,
        required: true,
    },
    matricula:{
        type: String,
        required: false,
    },
    color:{
        type: String,
        required: false,
    },
    acabados:{
        type: String,
        required: false,
    }
})

const Productos = mongoose.model("productos",productoSchema)

module.exports = Productos