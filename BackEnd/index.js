//Importamos express, db.js y dotenv
import express from 'express';
import dotenv from 'dotenv';
import conexionDB from "./config/db.js";

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

//Importaciones de routers de Veterinario y Paciente
import veterinarioRoutes from "./routes/VeterinarioRoutes.js";
import pacienteRoutes from "./routes/PacienteRoutes.js";

//Definimos la ruta base de RouterVeterinarios
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);