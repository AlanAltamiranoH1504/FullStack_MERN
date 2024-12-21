//Importamos mongoose y sacamos el objeto Schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
//Importamos generardor de id
import generarID from "../helpers/generarID.js";

// Definimos esquema
const VeterinarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarID()
    },
    confirmado:{
        type: Boolean,
        default: false
    }
});
//Hasheamos la contraseña antes de..
VeterinarioSchema.pre("save", async function (next){
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Metodo que verifica la contraseña
VeterinarioSchema.methods.comprobarPassword = async function(contraseñaRecibida){
    return await bcrypt.compare(contraseñaRecibida, this.password);
}

//Vinculamos el esquema al modelo
const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export  default Veterinario;

