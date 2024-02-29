const { response } = require('express')
const Medico = require('../models/medico.model')

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
      
        const medicoDB = await medico.save()
        
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}

const actualizarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const eliminarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'eliminarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
}