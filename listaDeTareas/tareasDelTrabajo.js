const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
const CadenaConexion = process.env.CONEXION_DB;

// Middleware
app.use(express.json());

//Conexion BD
mongoose.connect(CadenaConexion);

//Schema

const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaDeCreacion: Date,
  fechaDeCaducidad: Date,
  prioridad: String,
  estado: Boolean,
});

const Tarea = new mongoose.model("tareasDelTrabajo", tareaSchema);

//CRUD
//LEER TAREAS
app.get("/tareasDelTrabajo", async (req, res) => {
  const tareasConsulta = await Tarea.find().toArray();
  res.json(tareasConsulta);
});

//CREAR TAREA
app.post("/tareasDelTrabajo", async (req, res) => {
  const {
    titulo,
    descripcion,
    fechaDeCreacion,
    fechaDeCaducidad,
    prioridad,
    estado,
  } = req.body;
  const nuevaTarea = new Tarea({
    titulo,
    descripcion,
    fechaDeCreacion,
    fechaDeCaducidad,
    prioridad,
    estado,
  });
  await nuevaTarea.save();
  res.json({
    msg: "La tarea se ha guardado",
  });
});

//ACTUALIZAR TAREA
app.put("/tareasDelTrabajo/:id", async (req, res) => {
  const idTarea = req.params.id;
  const {
    titulo,
    descripcion,
    fechaDeCreacion,
    fechaDeCaducidad,
    prioridad,
    estado,
  } = req.body;

  const tareaModificar = await Tarea.findByIdAndUpdate(
    idTarea,
    {
      titulo,
      descripcion,
      fechaDeCreacion,
      fechaDeCaducidad,
      prioridad,
      estado,
    },
    { new: true }
  );
  res.json(tareaModificar);
});

//ELIMINAR TAREA
app.delete("/tareasDelTrabajo/:id", async (req, res) => {
  const idTarea = req.params.id;
  await Tarea.findByIdAndDelete(idTarea);
  res.json({ msg: "La Tarea se elimino con exito" });
});
