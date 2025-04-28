
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql2');
 
app.use(cors());

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',         
    user: 'root',               
    password: '200904',  
    database: 'peluqueria'      
});



// Probar la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Base de datos conectada');
});

//--------------------------------------------------------------------

app.post('/reservar', (req, res) => {
    const { nombre_cliente, telefono_cliente, servicio, fecha, hora } = req.body;

    const query = 'INSERT INTO turnos (nombre_cliente, telefono_cliente, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [nombre_cliente, telefono_cliente, servicio, fecha, hora], (error, results) => {
        if (error) {
            console.error('Error al reservar turno:', error);
            res.status(500).json({ mensaje: 'Error al reservar turno' });
            return;
        }
        res.status(201).json({ mensaje: 'Turno reservado exitosamente' });
    });
});


app.get('/turnos', (req, res) => {
    const query = 'SELECT * FROM turnos ORDER BY fecha, hora';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener turnos:', error);
            res.status(500).json({ mensaje: 'Error al obtener turnos' });
            return;
        }
        res.json(results);
    });
});


// ---------------------------------------- - - - - - - -  -- --


// Middleware para permitir CORS y leer JSON
app.use(cors());
app.use(bodyParser.json());

// Ruta básica para probar si el servidor anda
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
});

// Ponemos el servidor a escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});