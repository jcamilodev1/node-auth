const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@apis.lproae2.mongodb.net/?retryWrites=true&w=majority`
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@apis.lproae2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
// route middlewares
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./middleware/validate-token');
app.use('/api/dashboard', verifyToken, dashboadRoutes);
app.use('/api/user', authRoutes);
// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})