const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-seguro';
const JWT_EXPIRE_TIME = '24h';

function generarToken(usuario) {
    return jwt.sign({
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE_TIME
    });
}

function verificarToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generarToken,
    verificarToken
};