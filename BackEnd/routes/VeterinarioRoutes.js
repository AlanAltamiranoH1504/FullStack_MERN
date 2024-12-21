//Importamos express
import express from 'express';
//Definimos el router
const router = express.Router();
//Importamos el controlador
import {registrar, perfil, confirmar, autenticar} from "../controller/VeterinarioController.js";

//Rutas de Veterinario
router.post("/", registrar);
router.get("/perfil", perfil);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

export default router;