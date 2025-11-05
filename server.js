import express from 'express';
import pg from 'pg';

const app = express();
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


// criando a api com express

app.get('/', async (req, res) => {
    res.send('servidor rodando!');
});

app.get('/produtos', (req, res) => {
    pool.query('SELECT * FROM produtos');
    res.send(result.rows);
});

app.put('/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, preco } = req.body;
    await pool.query('UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3', [nome, preco, id]);
    res.send(`Produto com id ${id} atualizado com sucesso!`);
});

app.delete('/produtos/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.send(`Produto com id ${id} deletado com sucesso!`);
});

app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    await pool.query('INSERT INTO produtos (nome, preco) VALUES ($1, $2)', [nome, preco]);
    res.send(`Produto ${nome} adicionado com sucesso!`);
});

app.listen(5000)