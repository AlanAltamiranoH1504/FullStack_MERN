import React from 'react';
import {useState} from "react";
import {Link} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import axios from "axios";
import useAuth from "../hooks/useAuth.jsx";

const OlvidePassword = () => {
    //states
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});

    //Funcion que valida el formulario
    async function validarFormulario(e) {
        e.preventDefault();

        //Validamos que el campo email no este vacio
        if (email.trim() === ""){
            setAlerta({mensaje: "Campo de email vacio", error: true});
            return;
        }

        try{
            const rutaBase = import.meta.env.VITE_BACKEND_URL;
            const url = `${rutaBase}/veterinarios/resetpassword`;
            const respuesta = await axios.post(url, {email});
            setAlerta({mensaje: "Hemos enviado un email con las instrucciones", error: false});
        }catch (e){
            console.log("ERROR: " + e.message);
            setAlerta({mensaje: "Email no registrado", error: true});
        }

    }

    const {mensaje} = alerta;
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu acceso y no pierdas tus <span
                    className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/*Mostramos alerta de manera condicional*/}
                {mensaje && <Alerta alerta={alerta}/>}

                <form onSubmit={validarFormulario}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" name="email"
                               id="email" placeholder="Ingresa tu email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Recuperar Contraseña"
                           className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto"/>
                </form>
                {/*Seccion de enlaces*/}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta?
                        Registrate</Link>
                    <Link to='/' className="block text-center my-5 text-gray-500">Iniciar Sesión</Link>
                </nav>
            </div>
        </>
    );
};

export default OlvidePassword;
