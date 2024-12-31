import React from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Alerta from "../components/Alerta.jsx";

const ConfirmarCuenta = () => {
    //Leemos los parametros de la url
    const params = useParams();
    const {id} = params;

    //UseState para alerta
    const [alerta, setAlerta] = useState({}) ;

    //Definimos useEffect
    useEffect(() =>{
        const confirmarCuenta = async () =>{
            try{
                const rutaBase = import.meta.env.VITE_BACKEND_URL;
                const url = `${rutaBase}/veterinarios/confirmar/${id}`;
                const respuesta = await axios.get(url);
                console.log(respuesta);
                setAlerta({mensaje: "Veterinario Confirmado, puedes iniciar Sesion", error: false});
            }catch (e){
                setAlerta({mensaje: "Token no valido", error: true});
            }
        }
        confirmarCuenta();
    }, []);
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienzaz a Administrar tus <span
                    className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario para crear cuenta*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <Alerta alerta={alerta}/>

                {/*Seccion de enlaces*/}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">Incia Session</Link>
                    <Link to='/olvide-password' className="block text-center my-5 text-gray-500">Recuperar mi
                        password</Link>
                </nav>
            </div>
        </>
    );
};

export default ConfirmarCuenta;
