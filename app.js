const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./conexion.js');
const usuariosRouter = require('./routes/usuario.js');
const authController = require('./controllers/authController.js'); 
const doctoresRouter = require('./routes/doctor.js');
const pacientesRouter = require('./routes/pacientes.js');

//autehtication


//middleware
app.use(express.json());

//routes
app.use('/usuario', usuariosRouter);
app.post('/login', authController.login);
app.use('/doctor', doctoresRouter);
app.use('/paciente', pacientesRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error in server:', err);
  });