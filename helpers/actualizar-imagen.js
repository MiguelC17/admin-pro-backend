const fs = require('fs')

const Usuario = require('../models/usuario.model')
const Medico = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

/*
    TODO: Codigo a tener a la mano:
    var serveIndex = require('serve-index');
    app.use(express.static(__dirname + '/'))
    app.use('/uploads', serveIndex(__dirname + '/uploads'));
*/

const borrarImagen = ( path ) => {

    // const pathViejo = `./uploads/medicos/${ medico.img }`

    if ( fs.existsSync( path ) ) {
        // Borrar la imagen anterior
        fs.unlinkSync( path )
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id )
            if ( !medico ) {
                console.log( 'No se encontró un medico por ID' )
                return false
            }
            
            const pathViejoMedico = `./uploads/medicos/${ medico.img }`
            borrarImagen( pathViejoMedico )

            medico.img = nombreArchivo
            await medico.save()
            return true

            break;

        case 'hospitales':
            const hospital = await Hospital.findById( id )
            if ( !hospital ) {
                console.log( 'No se encontró un hospital por ID' )
                return false
            }
            
            const pathViejoHospital = `./uploads/hospitales/${ hospital.img }`
            borrarImagen( pathViejoHospital )

            hospital.img = nombreArchivo
            await hospital.save()
            return true

            break;
        case 'usuarios':
            const usuario = await Usuario.findById( id )
            if ( !usuario ) {
                console.log( 'No se encontró un usuario por ID' )
                return false
            }
            
            const pathViejoUsuario = `./uploads/usuarios/${ usuario.img }`
            borrarImagen( pathViejoUsuario )

            usuario.img = nombreArchivo
            await usuario.save()
            return true

            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}