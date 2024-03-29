const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        requied: true,
    },
    rol:{
        type: String,
        required: true,
    },
    matricula:{
        type: String,
        required: true
    }
})

const Usuarios = mongoose.model ("usuarios",usuarioSchema)

module.exports = Usuarios
