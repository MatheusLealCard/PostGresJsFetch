const {Client} = require("pg")

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "dvdrental",
    port: "5432"
})

client.connect();

client.query(`select * from actor`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    client.end;
})