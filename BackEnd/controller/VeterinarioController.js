import Veterinario from "../models/Veterinario.js";
import e from "express";

//Rutas disponibles
const registrar =  async (req, res) =>{
    //Prevenir usuarios registrados
    const {email} = req.body;
    const existeUsuario = await Veterinario.findOne({email: email});
    if (existeUsuario){
        res.json({msg:"Usuario ya registrado"});
        return;
    }

    try {
        //Guardamos un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json({veterinarioGuardado});
    }catch (error){
        console.log("ERROR: " + error.message);
    }
}

const confirmar = async (req, res) =>{
    const token = req.params.token;
    const usuarioConfirmar = await Veterinario.findOne({token: token});

    if (!usuarioConfirmar){
        res.json({msg:"No se encontrado usuario con ese token"});
        return;
    }

    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente", toke: token});
    }catch (error){
        console.log("ERROR: " + error.message);
    }
};

const perfil = async (req, res) =>{
    res.json({
        msg: "Mostrando perfil"
    });
}

export {
    registrar,
    perfil,
    confirmar
}