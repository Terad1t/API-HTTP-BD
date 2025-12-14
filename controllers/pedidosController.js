// controllers/pedidosController.js
const db = require("../db");

function criarPedido(produtosIds, res) {
  if (!produtosIds || produtosIds.length === 0) {
    res.writeHead(400);
    res.end("Carrinho vazio");
    return;
  }

  const query = `
        SELECT SUM(preco) AS total 
        FROM produtos 
        WHERE id IN (?)
    `;

  db.query(query, [produtosIds], (err, results) => {
    if (err) {
      res.writeHead(500);
      res.end("Erro no banco");
      return;
    }

    const total = results[0].total;

    db.query("INSERT INTO pedidos (total) VALUES (?)", [total], () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          mensagem: "Pedido realizado com sucesso",
          total: total,
        })
      );
    });
  });
}

module.exports = { criarPedido };
