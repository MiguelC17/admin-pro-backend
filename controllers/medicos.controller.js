const { response } = require('express')
const Medico = require('../models/medico.model')

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre')
    res.json({
        ok: true,
        medicos
    })
}

const getMedicoById = async (req, res = response) => {

    const id = req.params.id

    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre')
            .populate('hospital', 'nombre')
 
        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: true,
            msg: 'Ha ocurrido un error'
        })
    }

}

const crearMedico = async (req, res = response) => {

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
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}

const actualizarMedico = async (req, res = response) => {

    const id = req.params.id
    const uid = req.uid

    try {

        const medico = await Medico.findById(id)

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un médico por ese ID'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {

        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })

    }
}

const eliminarMedico = async (req, res = response) => {

    const id = req.params.id

    try {

        const medico = Medico.findById(id)

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un médico por ese ID'
            })
        }

        await Medico.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        })
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
    getMedicoById,
}