const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "dev",
  password: "dev123",
<<<<<<< HEAD
  database: "loja_perifericos",
=======
  database: "loja_perifericos"
>>>>>>> cee7d1136faca4d47da4ea8060021ed0be7f3e7e
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("MySQL conectado!");
  }
});

module.exports = connection;
