require("dotenv").config();
const { Client } = require("pg");

// Configuração do cliente
const client = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    ssl: { rejectUnauthorized: false } // Configuração SSL se necessário
});

// Função para conectar ao banco de dados
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Conectado ao banco de dados!");
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    }
}

// Função para inserir dados no banco de dados
async function insertIntoDatabase(name, endereco, phoneNumber) {
    try {
        await client.query(
            `INSERT INTO clientes (name, endereco, phone_number) VALUES ($1, $2, $3)`,
            [name, endereco, phoneNumber]
        );
        console.log("Dados inseridos com sucesso!");
    } catch (err) {
        console.error("Erro ao inserir dados:", err.message);
    } finally {
        await client.end(); // Fecha a conexão
    }
}

// Função para enviar dados do formulário
async function sendDatabase() {
    // Coletar os valores dos inputs
    const name = document.querySelector('.name').value;
    const endereco = document.querySelector('.endereco').value;
    const phoneNumber = document.querySelector('.phoneNumber').value;

    // Conectar ao banco de dados
    await connectToDatabase();

    // Inserir dados no banco
    await insertIntoDatabase(name, endereco, phoneNumber);
}
