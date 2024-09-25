import express from "express"
import connection from "./connection.js" // Asegúrate de que esta ruta sea correcta
import cors from "cors"
import path from "path" // Importa path para manejar rutas
import { fileURLToPath } from "url" // Importa fileURLToPath para manejar URLs

const app = express()
const PORT = process.env.PORT || 3000

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors()) // Habilitar CORS
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname))) // Ahora esto debería funcionar

// Ruta para la página principal, redirigir a signin.html
app.get("/", (req, res) => {
  res.redirect("/signin.html") // Redirigir correctamente a signin.html
})

// Ruta para obtener todos los usuarios
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener los usuarios." })
    }
    res.json(results)
  })
})

// Ruta para registrar un nuevo usuario
app.post("/signup", async (req, res) => {
  const { fullname, username, email, password } = req.body

  // Verificar si todos los campos están presentes
  if (!fullname || !username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." })
  }

  // Verificar si la contraseña tiene al menos 6 caracteres
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres." })
  }

  // Consulta SQL para insertar el usuario
  const query =
    "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)"

  // Ejecutar la consulta con los datos del formulario
  connection.query(
    query,
    [fullname, username, email, password],
    (err, results) => {
      if (err) {
        console.error("Error al insertar el usuario:", err)
        return res
          .status(500)
          .json({ message: "Error al insertar el usuario." })
      }
      res.status(201).json({ message: "Usuario registrado correctamente." })
    }
  )
})

// Ruta para el inicio de sesión
app.post("/login", (req, res) => {
  const { username, password } = req.body

  // Verificar si ambos campos están presentes
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." })
  }

  // Consulta SQL para verificar si el usuario existe
  const query = "SELECT * FROM users WHERE username = ? AND password = ?"

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al verificar el usuario:", err)
      return res.status(500).json({ message: "Error en el servidor." })
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas." })
    }

    res.status(200).json({ message: "Inicio de sesión exitoso." })
  })
})

app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" })
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
