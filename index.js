import connection from "./connection.js"
import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      throw err
    }
    res.json(results)
  })
})

app.use((req, res) => {
  res.status(404).send("404 Not Found")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
