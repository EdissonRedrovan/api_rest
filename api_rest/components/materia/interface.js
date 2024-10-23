const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const { autenticar, autorizar } = require('../auth/middleware');

const router = express.Router();

// POST - Crear nueva materia (solo admin)
router.post('/', [
    autenticar,
    autorizar(['admin'])
], function(req, res) {
    controller.insertarMateria(req.body)
        .then((data) => response.success(req, res, data, 201))
        .catch((error) => response.error(req, res, error, 400));
});

// GET - Obtener materias (admin y usuario)
router.get('/', [
    autenticar,
    autorizar(['admin', 'usuario'])
], function(req, res) {
    const filtro = req.query || {};
    controller.obtenerMaterias(filtro)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

// PUT - Modificar materia (solo admin)
router.put('/:id', [
    autenticar,
    autorizar(['admin'])
], function(req, res) {
    controller.modificarMateria(req.params.id, req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

// DELETE - Eliminar materia (solo admin)
router.delete('/:id', [
    autenticar,
    autorizar(['admin'])
], function(req, res) {
    controller.eliminarMateria(req.params.id)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

module.exports = router;