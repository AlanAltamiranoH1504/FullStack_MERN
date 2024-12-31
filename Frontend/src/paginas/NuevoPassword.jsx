import React, {useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import {Link} from "react-router-dom";

const NuevoPassword = () => {
    //Leemos parametros de la url
    const params = useParams();
    const {token} = params;

    //useState para alerta
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        //Validamos que ninguno de los dos campos esten vacios y sean iguales
        if (password.trim() === "" || confirmarPassword.trim() === ""){
            setAlerta({mensaje: "Los campos estan vacios", error: true});
            return;
        }
        if (confirmarPassword !== password) {
            setAlerta({mensaje: "Las password no coinciden", error: true});
            return;
        }

        const rutaBase = import.meta.env.VITE_BACKEND_URL;
        const url = `${rutaBase}/veterinarios/resetpassword/${token}`;
        const respuesta = await axios.get(url);
        const {data} = respuesta;
        const {msg} = data;
        if (msg !== null){
            const respuesta2 = await axios.post(url, {password});
            setAlerta({mensaje: "Password Actualizada Correctamente", error: false});
        }
    }
    const {mensaje} = alerta;
    return (
        <>
            {/*Cabecera*/}
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu <span
                    className="text-black">Contraseña</span></h1>
            </div>

            {/*Seccion de formulario para restablecer password*/}
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/*Mostramos alerta de manera condicional*/}
                {mensaje && <Alerta alerta={alerta}/>}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold"
                               htmlFor="password">Password Nueva</label>
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

                    <input type="submit" value="Reestablecer Password"
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

export default NuevoPassword;
