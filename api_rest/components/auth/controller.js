const bcrypt = require('bcrypt');
const Usuario = require('../usuario/model');
const { generarToken } = require('./jwt-config');

// Formato promesa para mantener consistencia con el resto de controladores
function login(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findOne({ email });
            
            if (!usuario) {
                return reject('Usuario no encontrado');
            }

            const passwordValido = await bcrypt.compare(password, usuario.password);
            if (!passwordValido) {
                return reject('Contraseña incorrecta');
            }

            resolve(generarToken(usuario));
        } catch (error) {
            reject(error);
        }
    });
}

function registro(datos) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!datos.email || !datos.password || !datos.nombre || !datos.apellido) {
                return reject('Faltan datos requeridos');
            }

            const existeUsuario = await Usuario.findOne({ email: datos.email });
            if (existeUsuario) {
                return reject('El email ya está registrado');
            }

            const salt = await bcrypt.genSalt(10);
            datos.password = await bcrypt.hash(datos.password, salt);

            // Si no se proporciona rol, se asigna 'usuario' por defecto
            if (!datos.rol) {
                datos.rol = 'usuario';
            }

            const usuario = new Usuario(datos);
            await usuario.save();

            resolve(generarToken(usuario));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    login,
    registro
};