import React from 'react';
import {useState} from "react";
import Alerta from "./Alerta.jsx";
import usePacientes from "../hooks/UsePacientes.jsx";

const Formulario = () => {

    const [mascota, setMascota] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [alerta, setAlerta] = useState({});

    // const {pacientes} = usePacientes();
    // console.log(pacientes)

    function validarFormulario(e){
        e.preventDefault();
        if (mascota.trim() === "" || propietario === "" || email === "" || fecha === "" || sintomas === ""){
            setAlerta({mensaje: "Campos Vacios", error: true})
            return;
        }
    }
    const {mensaje} = alerta;
    return (
        <>
            <p className="text-lg text-center mb-10">
                Añade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form className="bg-white py-3 px-5 mb-10 lg:mb-0 shadow-md rounded-xl" onSubmit={validarFormulario}>
                {/*Mostramos alerta de manera condicional*/}
                {mensaje && <Alerta alerta={alerta}/>}
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota: </label>
                    <input type="text" name="mascota" id="mascota" placeholder="Nombre de la mascota"
                        className="border-2 w-full pt-2 mt-2 rounded-md"
                        onChange={(e) => setMascota(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre
                        Propietario: </label>
                    <input type="text" name="propietario" id="propietario" placeholder="Nombre del propietario"
                        className="border-2 w-full pt-2 mt-2 rounded-md"
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" placeholder="Email del propietario"
                        className="border-2 w-full pt-2 mt-2 rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">Fecha Alta: </label>
                    <input type="date" name="fecha" id="fecha"
                        className="border-2 w-full pt-2 mt-2 rounded-md"
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas: </label>
                    <textarea name="sintomas" id="sintomas" placeholder="Sintomas de la mascota"
                        className="border-2 w-full pt-2 mt-2 rounded-md"
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input className="bg-indigo-600 w-full p-3 text-white uppercase rounded-xl font-bold font-black hover:bg-indigo-700" type="submit" value="Registrar Paciente"/>
            </form>
        </>
    );
};

export default Formulario;
