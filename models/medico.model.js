const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
        // Se extraerá del token
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
        // Se debe enviar al hacer la petición
    }

})

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model( 'Medico', MedicoSchema )
