-- Cria��o do banco de dados
CREATE DATABASE IF NOT EXISTS Topicos;
USE Topicos;

-- Criação da tabela de fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    contato VARCHAR(100) NOT NULL    
    /*
    Tabela 2: Fornecedores
		Campos: id (chave primária), 
        nome (nome do fornecedor), 
        contato (informação de contato).
    */
);

-- Criação da tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
    
    /*
    Tabela 3: Categorias
		Campos: id (chave primária), 
        nome (nome da categoria).
    */
);

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco decimal NOT NULL,
    fornecedor_id INT,
    categoria_id INT,
    CONSTRAINT fk_fornecedores
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id),
    CONSTRAINT fk_categorias
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    
    
    /*
    Tabela 1: Produtos
		Campos: id (chave primária), 
		nome (nome do produto), 
        preco (preço do produto),
        id_fornec (ID do fornecedor), 
        categoria_id (ID da categoria).
    */
);


INSERT INTO fornecedores (nome, contato) VALUES 
('Distribuidora ABC', 'abc@distribuidora.com.br'),
('Alimentos XYZ', 'contato@alimentosxyz.com'),
('Bebidas 123', 'vendas@bebidas123.com'),
('Produtos Naturais', 'contato@produtosnaturais.com'),
('Verduras e Legumes', 'contato@verduraslegumes.com'),
('Laticínios Frescos', 'contato@laticiniosfrescos.com'),
('Carnes e Aves', 'contato@carneseaves.com'),
('Padaria do Bairro', 'contato@padaria.com'),
('Pescados Marinhos', 'contato@pescadosmarinhos.com'),
('Importados Delícia', 'contato@importadosdelicia.com');

INSERT INTO categorias (nome) VALUES 
('Frios'), 
('Bebidas'), 
('Conservas'), 
('Laticínios'), 
('Carnes'), 
('Pães e Bolos'), 
('Frutas'), 
('Verduras'), 
('Grãos'), 
('Doces');

INSERT INTO produtos (nome, preco, fornecedor_id, categoria_id) VALUES 
('Queijo Mussarela', 19.99, 1, 1),
('Suco de Laranja', 6.50, 2, 2),
('Sardinha em Conserva', 3.20, 3, 3),
('Presunto Fatiado', 15.75, 1, 1),
('Refrigerante Cola', 4.99, 2, 2),
('Milho Verde', 2.50, 3, 3),
('Leite Integral', 4.00, 4, 4),
('Iogurte Natural', 2.75, 4, 4),
('Bife de Alcatra', 25.99, 5, 5),
('Frango Inteiro', 18.00, 5, 5),
('Pão Francês', 0.75, 6, 6),
('Bolo de Cenoura', 8.50, 6, 6),
('Maçã', 3.00, 7, 7),
('Banana', 2.00, 7, 7),
('Alface', 1.50, 8, 8),
('Tomate', 3.50, 8, 8),
('Feijão Preto', 4.00, 9, 9),
('Arroz Branco', 3.00, 9, 9),
('Chocolate ao Leite', 2.50, 10, 10),
('Biscoito Recheado', 3.50, 10, 10),
('Queijo Prato', 22.99, 1, 1),
('Refrigerante Limão', 4.89, 2, 2),
('Atum em Conserva', 4.20, 3, 3),
('Manteiga', 7.00, 4, 4),
('Costela de Porco', 22.50, 5, 5),
('Croissant', 3.00, 6, 6),
('Uva', 5.00, 7, 7),
('Couve', 2.00, 8, 8),
('Lentilha', 5.50, 9, 9),
('Doce de Leite', 8.00, 10, 10);


-- Exibindo uma mensagem de confirma��o
SELECT 'Banco de dados Topicos e tabelas criadas com sucesso!' AS status;