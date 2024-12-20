//Importamos express
import express from 'express';
//Definimos el router
const router = express.Router();
//Importamos el controlador
import {registrar, perfil, confirmar} from "../controller/VeterinarioController.js";

//Rutas de Veterinario
router.post("/", registrar);
router.get("/perfil", perfil);
router.get("/confirmar/:token", confirmar);

export default router;