import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Formulario from './models/Formulario.js'; // com .js no final

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/formularioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/formulario', async (req, res) => {
  try {
    const novo = new Formulario(req.body);
    await novo.save();
    res.status(201).json({ message: 'Dados salvos com sucesso!' });
  } catch {
  res.status(500).json({ error: 'Erro ao salvar dados' });
}
});

app.get('/api/formulario', async (req, res) => {
  const dados = await Formulario.find();
  res.json(dados);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
