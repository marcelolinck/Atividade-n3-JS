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

// Rota para listar os fornecedores
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

// Rota para atualizar um fornecedor
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

// Rota para deletar um fornecedor
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

// Rota para exibir os produtos de um fornecedor
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

/* Fim dos fornecedores */

// Rota para listar as categorias
app.get("/api_v1/categorias", (req, res) => {
  const query = "SELECT * FROM categorias";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar categorias: " + err);
    }
    res.json(results);
  });
});

// Rota para criar uma nova categoria
app.post("/api_v1/categorias", (req, res) => {
  const { nome } = req.body;
  // Log para depuração
  console.log(
    `Recebido POST para criar categoria: Nome: ${nome}`
  );
  
  const query = "INSERT INTO categorias (nome) VALUES (?)";
  
  db.query(query, [nome], (err, result) => {
    if (err) {
      console.error("Erro ao criar a categoria:", err);
      return res.status(500).send("Erro ao criar a categoria: " + err);
    }
    res.status(201).send("Categoria criada com sucesso!");
  });
});

// Rota para atualizar uma categoria
app.put("/api_v1/categorias/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  console.log(
    `Recebido PUT para ID: ${id}, Nome: ${nome}`
  );

  const query = "UPDATE categorias SET nome = ? WHERE id = ?";
  db.query(query, [nome, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar fornecedor:", err);
      return res.status(500).send("Erro ao atualizar a categoria: " + err);
    }
    res.send("Categoria atualizada com sucesso!");
  });
});

// Rota para exibir os produtos de uma categoria
app.get("/api_v1/categorias/:id/produtos", (req, res) => {
  const { id } = req.params;
  console.log(`Recebido GET para produtos da categoria ID: ${id}`);
  // Log para depuração
  const query = "SELECT nome, preco FROM produtos WHERE categoria_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).send("Erro ao buscar produtos: " + err);
    }
    res.json(results);
  });
});

// Rota para deletar uma categoria
app.delete("/api_v1/categorias/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Recebido DELETE para ID: ${id}`);
  // Log para depuração
  const query = "DELETE FROM categorias WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir a categoria:", err);
      return res.status(500).send("Erro ao excluir categoria: " + err);
    }
    res.send("Categoria excluída com sucesso!");
  });
});







app.get("/api_v1/produtos", (req, res) => {
  const query = `SELECT p.id, p.nome, FORMAT(p.preco, 2) as preco_real, p.categoria_id, c.nome as categoria, p.fornecedor_id,  f.nome as razao, f.contato as contato_no_fornecedor FROM topicos.produtos p inner join topicos.fornecedores f on p.fornecedor_id = f.id inner join topicos.categorias c on c.id = p.categoria_id order by p.nome asc`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar fornecedores: " + err);
    }
    res.json(results);
  });
});

// Rota para criar uma nova categoria
app.post("/api_v1/produtos", (req, res) => {
  const { nome, preco, fornecedor_id, categoria_id } = req.body;
  // Log para depuração
  console.log(
    `Recebido POST para criar Produto: Nome: ${nome} Preco ${preco} fornecedor ${fornecedor_id} categoria ${categoria_id}`
  );
  
  const query = "INSERT INTO produtos (nome, preco, fornecedor_id, categoria_id) VALUES (?,?,?,?)";
  
  db.query(query, [nome, preco, fornecedor_id, categoria_id], (err, result) => {
    if (err) {
      console.error("Erro ao criar o produto:", err);
      return res.status(500).send("Erro ao criar o produto: " + err);
    }
    res.status(201).send("Produto criado com sucesso!");
  });
});

// Rota para atualizar uma categoria
app.put("/api_v1/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco, fornecedor_id, categoria_id } = req.body;
  console.log(
    `Recebido PUT para ID: ${id}, Nome: ${nome}, Preco: ${preco}, Fornecedor ${fornecedor_id} e categoria ${categoria_id} `
  );

  const query = "UPDATE produtos SET nome = ?, preco = ?, fornecedor_id = ?, categoria_id = ? WHERE id = ?";
  db.query(query, [nome, preco, fornecedor_id, categoria_id, id] , (err, result) => {
    if (err) {
      console.error("Erro ao atualizar fornecedor:", err);
      return res.status(500).send("Erro ao atualizar a categoria: " + err);
    }
    res.send("Categoria atualizada com sucesso!");
  });
});

// Rota para deletar uma categoria
app.delete("/api_v1/produtos/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Recebido DELETE para ID: ${id}`);
  // Log para depuração
  const query = "DELETE FROM produtos WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir a produtos:", err);
      return res.status(500).send("Erro ao excluir produtos: " + err);
    }
    res.send("Produto excluída com sucesso!");
  });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
