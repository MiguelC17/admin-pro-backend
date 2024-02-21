const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find()

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })

}

const crearUsuario = async (req, res) => {

    const { email, password } = req.body

    try {

        const existeEmail = await Usuario.findOne({ email })

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya existe'
            })
        }

        const usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )

        // Guardar usuario
        await usuario.save()

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id )

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }

}

const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id
    const { nombre, role, email } = req.body

    try {

        const usuarioDB = await Usuario.findById( uid )

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true} )

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}

const eliminarUsuario = async ( req, res = response ) => {

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById( uid )

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete( uid )

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}