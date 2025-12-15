const http = require("http");
const connection = require("./db");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/pedidos") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      try {
        const { produtos } = JSON.parse(body);

        if (!produtos || produtos.length === 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ erro: "Lista de produtos vazia" }));
        }

        // 1️⃣ Buscar produtos
        connection.query(
          "SELECT id, preco FROM produtos WHERE id IN (?)",
          [produtos],
          (err, produtosDb) => {
            if (err) {
              res.writeHead(500);
              return res.end(JSON.stringify(err));
            }

            // 2️⃣ Calcular total
            const total = produtosDb.reduce(
              (soma, p) => soma + Number(p.preco),
              0
            );

            // 3️⃣ Inserir pedido
            connection.query(
              "INSERT INTO pedidos (total) VALUES (?)",
              [total],
              (err, result) => {
                if (err) {
                  res.writeHead(500);
                  return res.end(JSON.stringify(err));
                }

                const pedidoId = result.insertId;

                // 4️⃣ Inserir itens
                const itens = produtosDb.map((p) => [pedidoId, p.id, p.preco]);

                connection.query(
                  "INSERT INTO pedido_itens (pedido_id, produto_id, preco) VALUES ?",
                  [itens],
                  (err) => {
                    if (err) {
                      res.writeHead(500);
                      return res.end(JSON.stringify(err));
                    }

                    // 5️⃣ Resposta final
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                      JSON.stringify({
                        mensagem: "Pedido registrado!",
                        pedidoId,
                        total,
                      })
                    );
                  }
                );
              }
            );
          }
        );
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ erro: "JSON inválido" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Rota não encontrada");
  }
});

server.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
