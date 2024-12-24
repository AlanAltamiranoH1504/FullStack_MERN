import Paciente from "../models/Paciente.js";
import express, {json, raw} from "express";
import paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) =>{
    try {
        const paciente = new Paciente(req.body);
        paciente.veterinario = req.veterinario._id;
        const pacienteGuardado = await paciente.save();
        res.json({msg: "Paciente guardado"});
    }catch (e){
        const error = new Error("Error en el registro de paciente");
        res.status(500).json({msg: error.message});
    }

}

const obtenerPacientes = async (req, res) =>{
    const veterinarioSesion = req.veterinario._id;
    const pacientes = await paciente.find().where("veterinario").equals(veterinarioSesion);
    res.json(pacientes);
}

const obtenerPaciente =  async (req, res) =>{
    const id = req.params.id;
    try{
        const pacienteEncontrado = await paciente.findById(id);

        if (pacienteEncontrado.veterinario._id.toString() !== req.veterinario._id.toString()){
            return res.json({msg: "Accion NO Valida"});
        }else{
            return res.json({msg: "Paciente encontrado", paciente: pacienteEncontrado});
        }
    }catch (e){
        const error = new Error("Error en la consulta del paciente");
        res.status(500).json({msg: error.message});
    }
}

const actualizarPaciente = async (req, res) =>{
    // const id = req.params.id;
    // const paciente = await paciente.findById(id);
    // if (!paciente) {
    //     return res.status(404).json({msg: "Paciente no existe"});
    // }
    //
    // if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
    //     return res.json({msg:"Accion no valida"});
    // }
    // //Actualizar paciente
    // paciente.nombre = req.body.nombre;
    // try {
    //     const pacienteActualizado = await paciente.save();
    //     res.json({msg: "Paciente actualizado"});
    // }catch (e){
    //     console.log("ERROR: " + e);
    // }
}

const eliminarPaciente = (req, res) =>{
    const id = req.params;
    console.log(id);
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}