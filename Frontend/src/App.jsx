//Importamos el router
import {BrowserRouter, Routes, Route} from "react-router-dom";
//Iportamos el layout
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./paginas/Login.jsx";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx";
import OlvidePassword from "./paginas/OlvidePassword.jsx";
import NuevoPassword from "./paginas/NuevoPassword.jsx";
import Registrar from "./paginas/Registrar.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    {/*  Rutas para area publica */}
                    <Routes>
                        <Route path="/" element={<AuthLayout/>}>
                            <Route index element={<Login/>}/>
                            <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
                            <Route path="olvide-password" element={<OlvidePassword/>}/>
                            <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                            <Route path="registrar" element={<Registrar/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App
