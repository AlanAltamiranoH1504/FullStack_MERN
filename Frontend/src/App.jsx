//Importamos el router
import {BrowserRouter, Routes, Route} from "react-router-dom";
//Iportamos el layout
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./paginas/Login.jsx";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx";
import OlvidePassword from "./paginas/OlvidePassword.jsx";
import NuevoPassword from "./paginas/NuevoPassword.jsx";
import Registrar from "./paginas/Registrar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
          {/*  Rutas para area publica */}
          <Routes>
              <Route path="/" element={<AuthLayout/>}>
                  <Route index element={<Login/>}/>
                  <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
                  <Route path="olvide-password" element={<OlvidePassword/>}/>
                  <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                  <Route path="registrar" element={<Registrar/>}/>
              </Route>
          {/* Rutas para el area privada*/}
          {/*    <Route path="/" element={<AuthLayout/>}>*/}
          {/*        <Route index element={<Login/>}/>*/}
          {/*        <Route path="confirmar/:id" element={<ConfirmarCuenta/>} />*/}
          {/*        <Route path="olvide-password" element={<OlvidePassword/>}/>*/}
          {/*        <Route path="registrar" element={<Registrar/>}/>*/}
          {/*    </Route>*/}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
