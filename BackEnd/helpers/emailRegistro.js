import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const {email, nombre, token} = datos;
    const info = await transport.sendMail({
        from: "APV - ADMINISTRADOR DE PACIENTES",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "Comprueba tu cuenta en APV",
        html: `
                <p>Hola ${nombre}, comprueba tu cuenta en APV</p>
                <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
                
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
    console.log("Mensaje enviado: %s", info.messageId);
}
export default emailRegistro;