import mongoose from 'mongoose';

const FormularioSchema = new mongoose.Schema({}, { strict: false });

const Formulario = mongoose.model('Formulario', FormularioSchema);
export default Formulario;
