const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./conexion.js');
const usuariosRouter = require('./routes/usuario.js');
const authController = require('./controllers/authController.js'); 
const doctoresRouter = require('./routes/doctor.js');
const pacientesRouter = require('./routes/pacientes.js');
const asistentesRouter = require('./routes/asistentes.js');
const citasRouter = require('./routes/citas.js');

//autehtication


//middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'https://andormedproyect.web.app');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Max-Age', '86400');
      next();
    });

//routes
app.use('/usuario', usuariosRouter);
app.post('/login', authController.login);
app.use('/doctor', doctoresRouter);
app.use('/paciente', pacientesRouter);
app.use('/asistente', asistentesRouter);
app.use('/citas', citasRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error in server:', err);
  });