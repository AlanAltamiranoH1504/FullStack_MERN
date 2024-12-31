import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import e from "express";
import {Error} from "mongoose";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//Rutas disponibles
const registrar = async (req, res) => {
    //Prevenir usuarios registrados
    const {email, nombre, } = req.body;
    const existeUsuario = await Veterinario.findOne({email: email});
    if (existeUsuario) {
        res.json({msg: "Usuario ya registrado"});
        return;
    }

    try {
        //Guardamos un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        //Enviamos el email
        emailRegistro({email, nombre, token: veterinarioGuardado.token});

        res.json({veterinarioGuardado});
    } catch (error) {
        console.log("ERROR: " + error.message);
    }
}

const confirmar = async (req, res) => {
    const token = req.params.token;
    const usuarioConfirmar = await Veterinario.findOne({token: token});

    if (!usuarioConfirmar) {
        res.json({msg: "No se encontrado usuario con ese token"});
        return;
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario confirmado correctamente", toke: token});
    } catch (error) {
        console.log("ERROR: " + error.message);
    }
};

const autenticar = async (req, res) => {
    /*1. usuario exista, 2. cuenta confirmada, 3.password correcta 4. lo autentico*/
    const {email, password} = req.body;
    // Comprobamos que el usuario existe con ese email
    const usuarioExiste = await Veterinario.findOne({email: email});
    if (!usuarioExiste) {
        res.json({msg: "Usuario no registrado"});
        return;
    } else {
        const {confirmado} = usuarioExiste;
        if (confirmado) {
            if (await usuarioExiste.comprobarPassword(password)) {
                res.json({
                    msg: "Usuario registrado, confirmado y con password correcta",
                    token: generarJWT(usuarioExiste.id)
                });
            } else {
                res.json({msg: "Contraseña incorrecta"});
            }
        } else {
            res.json({msg: "No ha confirmado su cuenta"})
        }
    }
}

const perfil = async (req, res) => {
    const veterinario = req.veterinario;
    res.json({
        msg: "Mostrando perfil",
        veterinario
    });
}

const reestablecer = async (req, res) => {
    const {email, nombre} = req.body;
    //Buscamos el email en la db
    const veterinario = await Veterinario.findOne({email: email});
    if (!veterinario) {
        const error = new Error("Veterinario no registrado");
        return res.status(400).json({msg: error.message});
    }
    //Si el veterinario existe: genera token, envia a email, abre el enlace y busca el token en la db
    try {
        //Generamos token para ese usuario econtrado
        veterinario.token = generarID();
        await veterinario.save();
        //Enviamos email para reestablecer password
        emailOlvidePassword({email, nombre: veterinario.nombre, token: veterinario.token});

        res.json({msg: "Hemos enviado un email con las instrucciones"});
        //Guardamos en la db
    } catch (error) {
        console.log("ERROR: " + error.message);
    }
}

const comprobarToken = async (req, res) => {
    const token = req.params.token;
    //Buscamos el usuario que tiene ese token
    const usuario = await Veterinario.findOne({token: token});
    if (usuario) {
        //El usuario con ese token existe, por lo tanto el token es valido
        res.json({msg: "Token valido y el usuario existe"});
    } else {
        const error = new Error("Token no valido");
        return res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async (req, res) => {
    //Sacamos el token
    const token = req.params.token;
    //Sacamos el body de la peticion
    const {password} = req.body;

    //Buscamos el usuario con ese token y si existe le pasamos la password
    const veterinario = await Veterinario.findOne({token});
    if (veterinario){
        try{
            veterinario.token = null;
            veterinario.password = password;
            await veterinario.save();
            res.json({msg: "Password actualizada"});
        }catch (e){
            const error = new Error("Error en actualizacion de password");
            res.status(400).json({msg: error.message});
        }
    }else{
        const error = new Error("Hubo un error");
        return res.status(400).json({msg: error.message});
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    reestablecer,
    comprobarToken,
    nuevoPassword
}