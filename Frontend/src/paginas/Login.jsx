import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import axios from "axios";

const Login = () => {
    const {auth} = useAuth();
    //States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    async function envioFormulario(e){
        e.preventDefault();

        //Verificamos que los campos esten llenos
        if (email.trim() === "" || password.trim() === ""){
            setAlerta({mensaje: "Los campos se encuentran vacios", error: true});
            return;
        }

        try{
            const rutaBase = import.meta.env.VITE_BACKEND_URL;
            const url = `${rutaBase}/veterinarios/login`;
            const respuesta = await axios.post(url, {email, password});
            const {data} = respuesta;
            const {msg} = data;

            if (msg === 'Contraseña incorrecta'){
                setAlerta({mensaje: msg, error: true});
            }else if(msg === 'Usuario no registrado'){
                setAlerta({mensaje: msg, error: true});
            }else if(msg === 'No ha confirmado su cuenta'){
                setAlerta({mensaje: msg, error: true});
            }else{
                const {token} = data;
                localStorage.setItem('token', token);
                navigate('/admin')
            }
        }catch (e){
            setAlerta({mensaje: data.msg, error: true});
        }
    }
    const {mensaje} = alerta;
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>

            {/*Seccion de formulario*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/*Mostramos alerta de manera condicional*/}
                {mensaje && <Alerta alerta={alerta}/>}
                <form onSubmit={envioFormulario}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" name="email"
                               id="email" placeholder="Ingresa tu email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" name="password"
                               id="password" placeholder="Ingresa tu password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto"/>
                </form>

                {/*Seccion de enlaces*/}
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
                    <Link to='/olvide-password' className="block text-center my-5 text-gray-500">Recuperar mi password</Link>
                </nav>
            </div>
        </>
    );
};

export default Login;
