const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const usuarioSchema = new Schema({
    nombre: requiredString,
    apellido: requiredString,
    email: {
        ...requiredString,
        unique: true
    },
    password: requiredString,
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    fecha_registro: Date,
    fecha_actualizacion: Date,
}, {
    timestamps: {
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_actualizacion'
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;