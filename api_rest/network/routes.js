const usuario = require('../components/usuario/interface');
const materia = require('../components/materia/interface');
const auth = require('../components/auth/routes');

const routes = function( server ) {
    server.use('/auth', auth);
    server.use('/usuario', usuario);
    server.use('/materia', materia);
}

module.exports = routes;