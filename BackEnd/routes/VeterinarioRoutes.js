//Importamos express
import express from 'express';
//Definimos el router
const router = express.Router();
//Importamos el controlador
import {registrar, perfil, confirmar, autenticar, reestablecer, comprobarToken, nuevoPassword} from "../controller/VeterinarioController.js";
//Importamos el middlware de autenticacion
import autenticacionMiddle from "../middleware/autenticacionMiddle.js";

//Rutas de Veterinario publicas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/resetpassword", reestablecer);
router.get("/resetpassword/:token", comprobarToken);
router.post("/resetpassword/:token", nuevoPassword);

//Rutas de veterinario privadas
router.get("/perfil", autenticacionMiddle, perfil);

export default router;