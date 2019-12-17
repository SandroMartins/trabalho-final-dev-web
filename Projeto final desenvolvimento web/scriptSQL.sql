/*
	Trabalho final disciplina programação web, segue scripts utilizados.
	Banco de dados: MYSQL
	Autor: Sandro, Ivan
*/
-- Criando a tabela usuario.
CREATE TABLE usuario (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	login VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NOT NULL,
    nome VARCHAR(50) NOT NULL,
	data_nascimento DATE NOT NULL,
	sexo VARCHAR(30) NOT NULL,
	cep VARCHAR(20),
    logradouro VARCHAR(50),
    numero VARCHAR(20),
    complemento VARCHAR(30),
    bairro VARCHAR(50),
    cidade VARCHAR(30),
    estado VARCHAR(30),
    ativo boolean
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO usuario (login, senha, nome, data_nascimento, sexo, cep, logradouro, numero, complemento, bairro, cidade, estado, ativo
			VALUES ('sandro.junior', '12345', 'Sandro Ireno Martins Junior', '1994-02-28','Masculino','88020302','Servidão','65','Casa','Ponta das Canas','Florianópolis','Santa Catarina',true);
			

-- Criando a tabela produto.
CREATE TABLE produto (
	id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(200),
	nome VARCHAR(50) NOT NULL,
	medida VARCHAR(50) NOT NULL,
    preco DOUBLE NOT NULL,
	quantidade INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;			
			