import mysql2 from "mysql2"
import express from "express"

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "hpdelucas",
  database: "users",
})

let { database: databaseName } = connection.config

connection.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log(`Connected to ${databaseName} database`)
    connection.end()
  }
})

const element = `SELECT * FROM users`
connection.query(element, (err, list) => {
  if (err) {
    throw err
  } else {
    console.log(list)
  }
})

export default connection
