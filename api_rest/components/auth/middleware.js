const { verificarToken } = require('./jwt-config');
const response = require('../../network/response');

// Middleware de autenticación
function autenticar(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return response.error(req, res, 'Token no proporcionado', 401);
        }

        const decoded = verificarToken(token);
        req.usuario = decoded;
        next();
    } catch (error) {
        return response.error(req, res, 'Token inválido', 401);
    }
}

// Middleware de autorización
function autorizar(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return response.error(
                req, 
                res, 
                'No tienes permiso para realizar esta acción',
                403
            );
        }
        next();
    };
}

module.exports = {
    autenticar,
    autorizar
};