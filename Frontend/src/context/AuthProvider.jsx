import React from 'react';
import {useState, useEffect, createContext} from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() =>{
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token');
            if (!token){
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                const rutaBase = import.meta.env.VITE_BACKEND_URL;
                const url = `${rutaBase}/veterinarios/perfil`;
                const respuesta = await axios.get(url, config);
                const {data} = respuesta;
                const {veterinario} = data;

                setAuth(veterinario);
            }catch (e){
                setAuth({});
                console.log("ERROR: " + e.message);
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        setAuth({});
    }

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext