//Importamos express, db.js y dotenv
import express from 'express';
import dotenv from 'dotenv';
import conexionDB from "./config/db.js";

//Instancia de express
const app = express();

//Definimos puerto de express
const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`Coriendo servidor en el puerto ${port}`);
});
//Revisamos conexion a la db
dotenv.config();
conexionDB();

//Definimos la primera ruta
app.use("/", (req, res) =>{
   res.send("Esta funcionando de manera correcta el servidor 4000. Alan Altamirano");
});