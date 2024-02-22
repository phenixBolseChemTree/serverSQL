const express = require("express");
const { Client } = require('pg');

const app = express();
const port = 8080;

const client = new Client({
  connectionString: 'postgres://vyksgghi:9AbXtm0q42EV_3QWG3EsZTYIuBQKGZm_@rosie.db.elephantsql.com/vyksgghi',
});

client.connect();

app.get('/', (req, res) => {
  client.query('SELECT * FROM Users', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.json(result.rows);
    }
  });
});

app.on('close', () => {
  client.end();
  console.log('Соединение с базой данных закрыто');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
