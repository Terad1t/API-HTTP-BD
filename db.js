const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "dev",
  password: "dev123",
  database: "loja_perifericos", // 👈 TEM QUE SER ESSE
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("MySQL conectado!");
  }
});

module.exports = connection;
