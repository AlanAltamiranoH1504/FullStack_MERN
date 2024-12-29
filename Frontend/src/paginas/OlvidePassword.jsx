import React from 'react';
import {Link} from "react-router-dom";

const OlvidePassword = () => {
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu acceso y no pierdas tus <span className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" name="email"
                               id="email" placeholder="Ingresa tu email"/>
                    </div>

                    <input type="submit" value="Recuperar Contraseña"
                           className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto"/>
                </form>
                {/*Seccion de enlaces*/}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
                    <Link to='/' className="block text-center my-5 text-gray-500">Iniciar Sesión</Link>
                </nav>
            </div>
        </>
    );
};

export default OlvidePassword;
