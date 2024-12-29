import React from 'react';
import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";

const Registrar = () => {
    //States
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    //Validacion de campos del formulario
    async function validarFormulario(e) {
        e.preventDefault();
        if (nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmarPassword.trim() === "") {
            setAlerta({mensaje: "Los campos estan vacios", error: true});
            return;
        }
        if (confirmarPassword !== password) {
            setAlerta({mensaje: "Las contraseñas no coinciden", error: true});
            return;
        }
        if (password.length < 6) {
            setAlerta({mensaje: "La contraseña es muy corta, minimo 6 caracteres", error: true});
            return;
        }
        setAlerta({});
        //Guardamos en la db
        try{
            const url = "http://localhost:4000/api/veterinarios";
            const respuesta = await axios.post(url, {nombre, email, password});
            setAlerta({mensaje: "Veterinario Registrado, revisa tu email", error: false});
        }catch (e){
            console.log("ERROR: " + e.message);
        }

    }
    const {mensaje} = alerta;
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span
                    className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario para crear cuenta*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/*Mostramos alerta de manera condicional*/}
                {mensaje && <Alerta alerta={alerta}/>}
                <form onSubmit={validarFormulario}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold"
                               htmlFor="email">Nombre</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" name="nombre"
                               id="nombre" placeholder="Ingresa tu nombre"
                               value={nombre}
                               onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" name="email"
                               id="email" placeholder="Ingresa tu email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold"
                               htmlFor="password">Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" name="password"
                               id="password" placeholder="Ingresa tu password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Confirma tu
                            Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password"
                               name="password-confirmar"
                               id="password-confirmar" placeholder="Confirma tu password"
                               value={confirmarPassword}
                               onChange={(e) => setConfirmarPassword(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Crear Cuenta"
                           className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto"/>
                </form>

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

export default Registrar;
