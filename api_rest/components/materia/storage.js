const model = require('./model');

async function insertarMateria(dato) {
    const resultado = await new model(dato);
    return resultado.save();
}

async function obtenerMaterias(filtro = {}) {
    const resultado = await model.find(filtro);
    return resultado;
}

async function modificarMateria(id, dato) {
    const resultado = await model.findByIdAndUpdate(id, dato, { new: true });
    return resultado;
}

async function eliminarMateria(id) {
    const resultado = await model.findByIdAndDelete(id);
    return resultado;
}

module.exports = {
    insertar: insertarMateria,
    obtener: obtenerMaterias,
    modificar: modificarMateria,
    eliminar: eliminarMateria
};