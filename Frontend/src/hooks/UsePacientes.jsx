import {useContext} from "react";
import {PacientesProvider} from "../context/PacientesProvider.jsx";

const usePacientes = () => {
    return useContext(PacientesProvider);
}
export default usePacientes;