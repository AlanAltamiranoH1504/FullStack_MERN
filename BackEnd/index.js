//Importamos express, db.js y dotenv
import express from 'express';
import dotenv from 'dotenv';
import conexionDB from "./config/db.js";
import cors from 'cors';

//Instancia de express
const app = express();
//Habilitamos el request.body
app.use(express.json());

//Definimos puerto de express
const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`Coriendo servidor en el puerto ${port}`);
});
//Revisamos conexion a la db
dotenv.config();
conexionDB();

//Definimos la posibilidad de CORS
const dominiosPermitidos = ["http://localhost:5173/"];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) === -1) {
            //El origin del request es permitido
            callback(null, true);
        }else {
            callback(new Error('No permitido por CORS'));
        }
    }
};
app.use(cors(corsOptions));

//Importaciones de routers de Veterinario y Paciente
import veterinarioRoutes from "./routes/VeterinarioRoutes.js";
import pacienteRoutes from "./routes/PacienteRoutes.js";
import e from "express";

//Definimos la ruta base de RouterVeterinarios
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);