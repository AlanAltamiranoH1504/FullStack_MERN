import React from 'react';
import {useState, useEffect, createContext} from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    useEffect(() =>{
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token');
            if (!token){
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
        }
        autenticarUsuario();
    }, [])

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext