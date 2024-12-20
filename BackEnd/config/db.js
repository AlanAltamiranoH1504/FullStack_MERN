// Importamos mongoose
import mongoose from "mongoose";

//Creamos instancia de conexion
const conexionDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log("MongoDB conectado en: " + url);
    }catch (error){
        console.log("Error: " + error.message);
        process.exit(1);
    }
};
export default conexionDB;