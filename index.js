require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Configurar CORS
app.use( cors() )

// Base de datos
dbConnection()

/*
    MEAN Atlas

    Usuario: MiguelC17
    Contraseña: 65TGzivYq5zzD5Zr
*/

// Rutas
app.get( '/', ( req, res ) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
})

