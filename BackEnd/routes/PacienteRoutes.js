import express from "express";
const router = express.Router();
import autenticacionMiddle from "../middleware/autenticacionMiddle.js";
import {agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente} from "../controller/PacienteController.js";

router.get("/", autenticacionMiddle, obtenerPacientes);
router.post("/", autenticacionMiddle, agregarPaciente);
router.get("/:id", autenticacionMiddle, obtenerPaciente);
router.put("/:id", autenticacionMiddle, actualizarPaciente);
router.delete("/:id", autenticacionMiddle, eliminarPaciente);

export default router;