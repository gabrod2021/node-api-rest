import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './products.js';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/products/', (req, res) => {
    res.json(products);
    })

app.get('/products/:id', (req, res) => {
    const product = products.find((item) => item.id == req.params.id);
    res.json(product);
    })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Podés ver el HTML en: http://localhost:${PORT}/`);
    console.log(`Y el JSON en: http://localhost:${PORT}/products`);
});