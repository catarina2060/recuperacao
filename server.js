const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuração da conexão com o banco de dados
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'stockcar'
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Função de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
};

// CRUD - Clientes
const createClientes = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

    const query = 'INSERT INTO Clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Cliente criado com sucesso', result });
        }
    });
};

const readClientes = (req, res) => {
    con.query("SELECT * FROM Clientes", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateClientes = (req, res) => {
    const { cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro} = req.body;

    const query = 'UPDATE Clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente atualizado com sucesso', result });
        }
    });
};

const deleteclientes = (req, res) => {
    let cliente_id = Number(req.params.cliente_id);

    const query = `DELETE FROM Clientes WHERE cliente_id = ${cliente_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Cliente  removido com sucesso', result });
        }
    });
};




// CRUD - Telefone
const createTelefone = (req, res) => {
    const { cliente_id, numero, tipo } = req.body;

    const query = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES (?, ?, ?)';
    con.query(query, [cliente_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Telefone criado com sucesso', result });
        }
    });
};



const readTelefone = (req, res) => {
    con.query("SELECT * FROM telefone", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateTelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo,  } = req.body;

    const query = 'UPDATE Telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?';
    con.query(query, [cliente_id, numero, tipo, telefone_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone  atualizado com sucesso', result });
        }
    });
};

const deletetelefone = (req, res) => {
    let telefone_id = Number(req.params.telefone_id)

    const query = `DELETE FROM telefone WHERE telefone_id = ${telefone_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Telefone  removido com sucesso', result });
        }
    });
};

// CRUD - Carros
const createCarros = (req, res) => {
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = 'INSERT INTO carros (marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id ) VALUES(?, ?, ?, ?, ?)';
    con.query(query, [  marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id  ], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Carros criado com sucesso', result });
        }
    });
};

const readCarros = (req, res) => {
    con.query("SELECT * FROM Carros", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateCarros = (req, res) => {
    const { marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, carros_id, cliente_id } = req.body;

    const query = 'UPDATE carros SET marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ?, cliente_id = ? WHERE carros_id = ?';
    con.query(query, [ marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id, carros_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Carros atualizado com sucesso', result });
        }
    });
};

const deletecarros = (req, res) => {
    let carros_id = Number(req.params.carros_id)

    const query = `DELETE FROM carros WHERE carros_id = ${carros_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'carros  removido com sucesso', result });
        }
    });
};


// Inicialização do Express
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

// Rotas para Clientes
app.post("/clientes", createClientes);
app.get("/clientes", readClientes);
app.put("/clientes", updateClientes);
app.delete("/clientes/:cliente_id", deleteclientes);

// Rotas para Telefone
app.post("/telefone", createTelefone);
app.get("/telefone", readTelefone);
app.put("/telefone", updateTelefone);
app.delete("/telefone/:telefone_id", deletetelefone);

// Rotas para Carros
app.post("/Carros", createCarros);
app.get("/Carros", readCarros);
app.put("/Carros", updateCarros);
app.delete("/carros/:carros_id", deletecarros);

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});