import Paciente from "../models/Paciente.js";
import paciente from "../models/Paciente.js";

const agregarPacientes = async (req, res) => {
    //Creamos paciente con los req.body
    const paciente = new Paciente(req.body);

    //Guardamos el paciente en la db
    try {
        //Sacamos el id del veterinario en sesion y lo seteamos al paciente
        const veterinarioSesion = req.veterinario._id;
        paciente.veterinario = veterinarioSesion;
        //Guardamos el paciente
        const pacienteGuardado = await paciente.save();
        res.json({msg: "Paciente guardado"});
    } catch (e) {
        const Error = new error("Error en el registro de nuevo paciente");
        res.json({msg: error});
    }
}

const obtenerPacientes = async (req, res) => {
    //Sacamos el veterinario que se encuentra en sesion
    const veterinarioSesion = req.veterinario._id;
    //Sacamos los pacientes de ese veterinario
    const pacientes = await Paciente.find({veterinario: veterinarioSesion});
    res.json({msg: "Pacientes del veterinario", pacientes: pacientes});
}

const obtenerPaciente = async (req, res) => {
    const idPaciente = req.params.id;
    const veterinarioSesion = req.veterinario._id;
    try {
        const paciente = await Paciente.findOne({_id: idPaciente, veterinario: veterinarioSesion});
        if (paciente !== null) {
            res.json({paciente: paciente});
        } else {
            res.json({msg: "Paciente no encontrado"});
        }
    } catch (e) {
        const error = new Error("Paciente no Encontrado");
        res.json({msg: error});
    }
}

const actualizarPaciente = async (req, res) => {
    //Sacamos el id del paciente y el id del veterinario en sesion
    const idPaciente = req.params.id;
    const veterinarioSesion = req.veterinario._id;

    //Buscamos el paciente
    const paciente = await Paciente.findOne({_id: idPaciente, veterinario: veterinarioSesion});
    if (paciente !== null){
        //Seteamos al paciente encontrado los nuevos valores
        const {nombre, propietario, email, fecha, sintomas} = req.body;
        paciente.nombre = nombre || paciente.nombre;
        paciente.propietario = propietario || paciente.propietario;
        paciente.email = email || paciente.email;
        paciente.fecha = fecha || paciente.fecha;
        paciente.sintomas = sintomas || paciente.sintomas;
        try{
            //Actualizamos el paciente
            const pacienteActualizado = await paciente.save();
            res.json({paciente});
        }catch (e){
            const error = new Error("Error en actualizacion de paciente");
            res.json({msg: error});
        }
    }else{
        res.json({msg: "No existe ese paciente"});
    }
}

const eliminarPaciente = async (req, res) =>{
    const idPaciente = req.params.id;
    const veterinarioSesion = req.veterinario._id;
    const paciente = await Paciente.findOne({_id: idPaciente, veterinario: veterinarioSesion});

    if (paciente !== null){
        try{
            const pacienteEliminado = await Paciente.deleteOne({_id: idPaciente});
            if (pacienteEliminado !== null){
                res.json({msg: "Paciente eliminado"});
            }
        }catch (e){
            const error = new Error("Error en eliminar el paciente");
            res.json({msg: "Error al eliminar el paciente"});
        }
    }else{
        const error = new Error("No existe ese paciente");
        res.json({msg: "Paciente no existente"});
    }
}
export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}