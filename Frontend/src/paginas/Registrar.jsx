import React from 'react';
import {Link} from "react-router-dom";

const Registrar = () => {
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span
                    className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario para crear cuenta*/}
            <div  className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold"
                               htmlFor="email">Nombre</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" name="nombre"
                               id="nombre" placeholder="Ingresa tu nombre"/>
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" name="email"
                               id="email" placeholder="Ingresa tu email"/>
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold"
                               htmlFor="password">Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" name="password"
                               id="password" placeholder="Ingresa tu password"/>
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Confirma tu Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" name="password-confirmar"
                               id="password-confirmar" placeholder="Confirma tu password"/>
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
