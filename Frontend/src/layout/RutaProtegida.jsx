import React from 'react';
import {Outlet, Navigate} from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();

    if (cargando) return "Cargando";
    return (
        <>
            <Header />
            {/*Verificamos que auth tenga un usuario en sesion*/}
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet/>
                </main>
            ):(
                <Navigate to="/"/>
            )}

            <Footer/>
        </>
    );
};

export default RutaProtegida;
