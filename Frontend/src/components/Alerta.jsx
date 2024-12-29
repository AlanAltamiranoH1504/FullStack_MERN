import React from 'react';

const Alerta = ({alerta}) => {
    return (
        <>
            <div
                className={`${alerta.error ? 'from-red-600 to-red-500' : 'from-green-600 to-green-500'} bg-gradient-to-r rounded-xl font-bold uppercase text-white text-center my-3 p-3`}>
                {alerta.mensaje}
            </div>
        </>
    );
};

export default Alerta;
