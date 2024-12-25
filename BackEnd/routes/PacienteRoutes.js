import express from "express";

const router = express.Router();
import autenticacionMiddle from "../middleware/autenticacionMiddle.js";

import {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../controller/PacienteController.js";

//Rutas de pacientes
router.get("/", autenticacionMiddle, obtenerPacientes);
router.post("/", autenticacionMiddle, agregarPacientes)
router.get("/:id", autenticacionMiddle, obtenerPaciente);
router.put("/:id", autenticacionMiddle, actualizarPaciente);
router.delete("/:id", autenticacionMiddle, eliminarPaciente);

export default router;