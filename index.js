require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const usuarioRouter = require('./routes/usuario.routes')
const productoRouter = require('./routes/producto.routes')
const pedidoRouter = require('./routes/pedido.routes')
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("secretKey", process.env.JWTSECRET)


mongoose.connect(process.env.CONNECTIONSTRING,{
  
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a base de datos!'))
  .catch(err=> console.log('err'));


app.use('/productos',productoRouter)

app.use('/pedidos', pedidoRouter)


app.use('/usuarios',usuarioRouter)

app.listen(process.env.PORT)