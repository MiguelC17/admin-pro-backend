const { response } = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');

const getTodo = async ( req, res = response ) => {

    const busqueda = req.params.busqueda
    const regex = new RegExp( busqueda, 'i' ) // Hace que la busqueda sea insensible

/*
    const usuarios = await Usuario.find({ nombre: regex })
    const medicos = await Medico.find({ nombre: regex })
    const hospitales = await Hospital.find({ nombre: regex })
*/

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async ( req, res = response ) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp( busqueda, 'i' )

    let data = []

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img')
            break;
    
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
            break;
    
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, hospitales o medicos'
            })
          
    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}