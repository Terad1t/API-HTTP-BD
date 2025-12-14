const http = require("http");
const connection = require("./db");

const server = http.createServer((req, res) => {
  // GET /pedidos
  if (req.url === "/pedidos" && req.method === "GET") {
    connection.query("SELECT * FROM produtos", (err, results) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ erro: err }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });

    // POST /pedidos
  } else if (req.url === "/pedidos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { produtos } = JSON.parse(body);
        if (!produtos || !produtos.length) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ erro: "IDs de produtos obrigatórios" })
          );
        }

        connection.query(
          `SELECT * FROM produtos WHERE id IN (${produtos.join(",")})`,
          (err, results) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ erro: err }));
            }

            const total = results.reduce(
              (acc, item) => acc + parseFloat(item.preco),
              0
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ mensagem: "Pedido registrado!", total }));
          }
        );
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ erro: "JSON inválido" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ erro: "Rota não encontrada" }));
  }
});

server.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
