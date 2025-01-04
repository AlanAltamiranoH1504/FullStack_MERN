import React from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthProvider.jsx";
import useAuth  from "../hooks/useAuth.jsx";

const Header = () => {
    const {cerrarSesion} = useAuth();

    return (
        <>
            <header className="py-10 bg-indigo-600">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="font-bold text-2xl text-indigo-200 font-black text-center">Administrador de Pacientes <span className="text-white">de Veterinaria</span></h1>
                    <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 items-center">
                        <Link to="/admin" className="text-white text-xl uppercase font-bold">Pacientes</Link>
                        <Link to="/perfil" className="text-white text-xl uppercase font-bold">Perfil</Link>

                        <button onClick={cerrarSesion} type="button" className="text-white text-xl uppercase font-bold">Cerrar Sesión</button>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
