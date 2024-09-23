require("dotenv").config();

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;
const port = process.env.port;



const { Client } = require("pg");

const client = new Client({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
    ssl: { rejectUnauthorized: false } // Configuração SSL se necessário
});

client.connect()
    .then(() => {
        console.log("Conectado ao banco de dados!");
        return client.query(`select * from clientes`);
    })
    .then(res => {
        console.log(res.rows);
    })
    .catch(err => {
        console.error("Erro ao conectar ou realizar a consulta:", err.message);
    })
    .finally(() => {
        client.end();
    });
