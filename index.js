import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './products.js';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/products/', (req, res) => {
    //res.json(products);
    });
app.get('/products/search', (req, res) => {
    console.log(req.params);
    res.json(params);

});

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



const PORT = 3000
app.listen(PORT, () => {
    console.log(`Y el JSON en: http://localhost:${PORT}`);
});