const express = require("express");
const app = express();
app.use(express.json());

const users = [];

function findUserIndex(id) {
  return users.findIndex((user) => user.id === id);
}

//GET
app.get("/get", (req, res) => {
  res.json({
    message: "Todos los usuarios recuperados",
    data: users,
  });
});

//POST
app.post("/create", (req, res) => {
  const { id, nombre, age } = req.body;
  const newUser = { id, nombre, age }; 
  users.push(newUser); 
  res.status(201).json({ message: `Usuario ${nombre} de ${age} años creado` });
});

//PUT
app.put("/update/:id", (req, res) => {
  const id = +req.params.id;
  const { nombre, age } = req.body;
  const userIndex = findUserIndex(id);

  if (userIndex !== -1) {
    if (nombre !== undefined) {
      users[userIndex].nombre = nombre;
    }
    if (age !== undefined) {
      users[userIndex].age = age;
    }
    res.json({
      message: `Usuario con ID ${id} actualizado`,
      data: users[userIndex],
    });
  } else {
    res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
  }
});

//DELETE
app.delete("/delete/:id", (req, res) => {
  const id = +req.params.id;
  const userIndex = findUserIndex(id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: `Usuario con ID ${id} eliminado` });
  } else {
    res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
  }
});

//Iniciamos el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});