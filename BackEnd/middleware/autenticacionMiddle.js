import jwt from "jsonwebtoken";
import e from "express";
import Veterinario from "../models/Veterinario.js";
const autenticacionMiddle = async (req, res, next) =>{
    //Validamos que existe el token en el header
    let token;
    const {authorization} = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try{
            token = authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const {id} = decode;
            req.veterinario = await Veterinario.findById(id).select("-password -token -confirmado");
            return next();
        }catch (error){
            const e = new Error("Token no valido");
            return res.status(403).json({msg: e.message});
        }
    }
    if (!token){
        const error = new Error("Token no valido o inexistente");
        return res.status(403).json({msg: error.message});
    }
    next();
}
export default autenticacionMiddle;