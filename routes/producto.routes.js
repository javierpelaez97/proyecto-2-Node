const express = require('express')
const router = express.Router()

const { buscarTodos, buscarPorId, crearProducto, eliminarProducto, modificarProducto, buscarTodosQueContengan } = require('../controllers/producto.controller')

const { validarCrearProducto } = require('../helpers/validadores')

router.get("/", async (req, res) => {
    try {
        let productos = []
        if (req.query.nombreContiene || req.query.marcaContiene) {
            const nombre = req.query.nombreContiene ? req.query.nombreContiene : ""
            const marca = req.query.marcaContiene ? req.query.marcaContiene : ""
            productos = await buscarTodosQueContengan(nombre, marca)
        }
        else {
            productos = await buscarTodos()
        }

        res.json(productos)
    } catch (error) {
        console.log(String(error))
        res.status(500).json({ msg: "error interno " })
    }

})

router.get("/:id", async (req, res) => {
    try {
        const objetoEncontrado = await buscarPorId(req.params.id)
        if (objetoEncontrado) {
            res.json(objetoEncontrado)
        }
        else {
            res.status(404).json({ msg: 'error: producto no encontado' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'error interno' + String(error) })
    }


})

router.post("/", async (req, res) => {
    await crearProducto(
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())


    res.json({ msg: 'producto creado correctamente' })
})

router.delete("/:id", async (req, res) => {
    const productoBorrado = await eliminarProducto(req.params.id)
    if (productoBorrado) {
        res.json({ msg: 'producto borrado!' })
    }
    else {
        res.json({ msg: 'error: producto no encontrado' })
    }
})


router.put("/:id", async (req, res) => {
    let encontrado = null
    let msg = []
    
    const resultadoValidacion = validarCrearProducto(req.body)
    if (!resultadoValidacion.valido) {
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    }
    else {
        encontrado = await modificarProducto(
            req.params.id,
            req.body.nombre.trim(),
            req.body.marca.trim(),
            req.body.modelo.trim())

        res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })
    }

})



router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    encontrado = await modificarProducto(
        req.params.id,
        req.body.nombre.trim(),
        req.body.marca.trim(),
        req.body.modelo.trim())

    res.json(encontrado === null ? { msg: 'error: producto no encontrado' } : { dato: encontrado, mensajes: msg })

})

module.exports = router