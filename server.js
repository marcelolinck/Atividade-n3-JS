const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "topicos",
  password: "senhafacil",
  database: "topicos",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados ", err);
    return;
  }
  console.log(`Conectado ao banco mysql`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api_v1/fornecedores", (req, res) => {
  const query = "SELECT * FROM fornecedores";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar fornecedores: " + err);
    }
    res.json(results);
  });
});

// Rota para criar um novo fornecedor
app.post("/api_v1/fornecedores", (req, res) => {
  const { nome, contato } = req.body;
  // Log para depuração
  console.log(
    `Recebido POST para criar fornecedor: Nome: ${nome}, Contato: ${contato}`
  );
  
  const query = "INSERT INTO fornecedores (nome, contato) VALUES (?, ?)";
  
  db.query(query, [nome, contato], (err, result) => {
    if (err) {
      console.error("Erro ao criar fornecedor:", err);
      return res.status(500).send("Erro ao criar fornecedor: " + err);
    }
    res.status(201).send("Fornecedor criado com sucesso!");
  });
});

app.put("/api_v1/fornecedores/:id", (req, res) => {
  const { id } = req.params;
  const { nome, contato } = req.body;
  console.log(
    `Recebido PUT para ID: ${id}, Nome: ${nome}, Contato: ${contato}`
  );

  const query = "UPDATE fornecedores SET nome = ?, contato = ? WHERE id = ?";
  db.query(query, [nome, contato, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar fornecedor:", err);
      return res.status(500).send("Erro ao atualizar fornecedor: " + err);
    }
    res.send("Fornecedor atualizado com sucesso!");
  });
});

app.delete("/api_v1/fornecedores/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Recebido DELETE para ID: ${id}`);
  // Log para depuração
  const query = "DELETE FROM fornecedores WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir fornecedor:", err);
      return res.status(500).send("Erro ao excluir fornecedor: " + err);
    }
    res.send("Fornecedor excluído com sucesso!");
  });
});

// Fim dos fornecedores

app.get("/api_v1/categorias", (req, res) => {
  const query = "SELECT * FROM categorias";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar fornecedores: " + err);
    }
    res.json(results);
  });
});

app.get("/api_v1/produtos", (req, res) => {
  const query = `SELECT p.id, p.nome, FORMAT(p.preco, 2) as preco_real, c.nome as categoria,  f.nome as razao, f.contato as contato_no_fornecedor FROM topicos.produtos p inner join topicos.fornecedores f on p.fornecedor_id = f.id inner join topicos.categorias c on c.id = p.categoria_id order by p.nome asc`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar fornecedores: " + err);
    }
    res.json(results);
  });
});

app.get("/api_v1/fornecedores/:id/produtos", (req, res) => {
  const { id } = req.params;
  console.log(`Recebido GET para produtos do fornecedor ID: ${id}`);
  // Log para depuração
  const query = "SELECT nome, preco FROM produtos WHERE fornecedor_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).send("Erro ao buscar produtos: " + err);
    }
    res.json(results);
  });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
