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
    /*const product = products.find((item) => item.id == req.params.id);
    res.json(product);*/
    const{id} = req.params;
    const product = products.find((item) => item.id == id);

if(!product){
    res.status(404).json({error:"Producto inexistente"});
}
res.json(product);
});
app.get('/products/search', (req, res) => {
    console.log(req.params);
    res.json(params);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Podés ver el HTML en: http://localhost:${PORT}/`);
    console.log(`Y el JSON en: http://localhost:${PORT}/products`);
});