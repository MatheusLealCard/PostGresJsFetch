const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://192.168.1.11:8080' // URL do seu frontend
}));
app.use(express.json()); // Para processar o corpo das requisições JSON

const client = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    ssl: { rejectUnauthorized: false } // Configuração SSL se necessário
});

client.connect()
    .then(() => console.log("Conectado ao banco de dados!"))
    .catch(err => console.error("Erro ao conectar ao banco de dados:", err));

// Endpoint para inserção de clientes
app.post('/api/clientes', async (req, res) => {
    const { name, endereco, phoneNumber } = req.body;

    console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

    try {
        const result = await client.query(
            `INSERT INTO clientes (nome, endereco, numero) VALUES ($1, $2, $3) RETURNING *`,
            [name, endereco, phoneNumber]
        );
        res.status(201).json({ message: "Dados inseridos com sucesso!", cliente: result.rows[0] });
    } catch (err) {
        console.error("Erro ao inserir dados:", err.message);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
