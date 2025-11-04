import pg from 'pg';
const { Pool, Client } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: '5433',
    password: '1234',
    database: 'produtosdb'
});

try {
    await pool.connect();
        console.log('Conectado ao banco de dados com sucesso!');

} catch (error) {
    console.error(`Erro ao conectar ao banco de dados: ${error}`);

}

// Fazer um select para testar a conexão
const result = await pool.query('SELECT * FROM produtos');
console.log(`Resultado ${result}`);
