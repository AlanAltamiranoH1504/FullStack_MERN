import mongoose from "mongoose";
const {Schema} = mongoose;

const pacietesSchema = new Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    propietario:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fecha:{
        type: Date,
        require: true,
        default: Date.now()
    },
    sintomas:{
        type:String,
        require: true,
        trim: true
    },
    //Almacenamos referencia del veterinario de este paciente. Es la FK en relacion con la tabla Veterinarios
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario'
    }
}, {
    timestamps: true
});

//Vinculamos schema con modelo
const Paciente = mongoose.model("Paciente", pacietesSchema);
export default Paciente;