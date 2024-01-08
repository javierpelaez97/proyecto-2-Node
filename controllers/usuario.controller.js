const Usuario = require('../models/usuario.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const{encriptar, comprobar} =require('../helpers/encriptacion')

async function buscarTodos() {
    const usuarios = Usuario.find()
    return usuarios
}

async function buscarTodosPorMail(mail) {
    const usuarios = await Usuario.find({ email: mail })
    return usuarios
}

async function buscarUnoPorMail(mail) {
    const usuarioEncontrado = await Usuario.findOne({ email: mail })
    return usuarioEncontrado
}

async function buscarUnoPorMatricula(matricula) {
    const usuarioEncontrado = await Usuario.findOne({ matricula: matricula })
    return usuarioEncontrado
}
async function crearUsuario(email, pwd, rol, matricula) {
    const hash = await encriptar(pwd)
    const nuevoUsuario = new Usuario({
        email: email,
        password: hash,
        rol: rol,
        matricula: matricula,
    })
    await nuevoUsuario.save()

    return nuevoUsuario
}

async function login(mail, pwd) {
    const usuarioEncontrado = await Usuario.findOne({ email: mail })

    if (usuarioEncontrado) {
        const resultadoComparacion = await comprobar(usuarioEncontrado.password, pwd)
        if (resultadoComparacion) {

            const token = jwt.sign({ id: usuarioEncontrado._id, name: usuarioEncontrado.email }, process.env.JWTSECRET, { expiresIn: '1h' })
            return {
                usuario: usuarioEncontrado,
                token: token,
                msg: null,
            }
        }
        else {
            return {
                usuario: null,
                token: null,
                msg: 'password incorrecto'
            }
        }
    }
    else {
        return {
            usuario: null,
            token: null,
            msg: 'email no encontrado'
        }
    }
}
async function buscarPorId(id) {
    const usuarioEncontrado = await Usuario.findById(id)
    return usuarioEncontrado
}

module.exports = {
    buscarTodos,
    crearUsuario,
    login,
    buscarTodosPorMail,
    buscarUnoPorMail,
    buscarUnoPorMatricula,
    buscarPorId
}
