const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const routes = require("./routes");

app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con el origen del frontend
    credentials: true // Permitir que las cookies se envíen con solicitudes
}));
app.use(cookieParser())
app.use(express.json());

app.use("/api", routes);



// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
