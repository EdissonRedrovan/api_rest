const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const materiaSchema = new Schema({
    codigo: {
        ...requiredString,
        unique: true // Asegura que el código sea único
    },
    nombre: requiredString,
    fecha_registro: Date,
    fecha_actualizacion: Date,
}, {
    timestamps: {
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_actualizacion'
    }
});

const Materia = mongoose.model('Materia', materiaSchema);
module.exports = Materia;