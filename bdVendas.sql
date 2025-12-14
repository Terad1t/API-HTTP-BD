CREATE DATABASE loja_perifericos;
USE loja_perifericos;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80),
    preco DECIMAL(10, 2)
);

INSERT INTO produtos (nome, preco) VALUES
('MOUSE G403 PRO', 150.00),
('ATTACK SHARK X85', 350.00),
('REDRAGON ZEUS PRO', 280.00);

USE loja_perifericos;
SELECT * FROM produtos;