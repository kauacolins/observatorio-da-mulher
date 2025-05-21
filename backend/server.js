  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';

  // Importação dos models
  import Formulario from './models/Formulario.js';
  import User from './models/User.js';

  const app = express();
  app.use(cors());
  app.use(express.json());

  // 🔗 Conexão com MongoDB
  mongoose.connect('mongodb://localhost:27017/formularioDB', {

  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

  // 🔐 Configuração do JWT
  const JWT_SECRET = 'seu_segredo_super_secreto';

  // ==================== ROTAS DE FORMULÁRIO ====================

  // Salvar dados do formulário
  app.post('/api/formulario', async (req, res) => {
    try {
      const novo = new Formulario(req.body);
      await novo.save();
      res.status(201).json({ message: 'Dados salvos com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar dados' });
    }
  });

  // Obter dados do formulário
  app.get('/api/formulario', async (req, res) => {
    try {
      const dados = await Formulario.find();
      res.json(dados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  });

  // ==================== ROTAS DE AUTENTICAÇÃO ====================

  // Registro de usuário
  app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se o usuário já existe
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  });

  // Login de usuário
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login bem-sucedido', token });
  });

  // ==================== MIDDLEWARE DE AUTENTICAÇÃO ====================

  const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };

  // ==================== ROTA PROTEGIDA DE EXEMPLO ====================

  app.get('/api/protegido', verifyToken, (req, res) => {
    res.json({ message: 'Acesso permitido', user: req.user });
  });

  // ==================== INICIAR SERVIDOR ====================

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
