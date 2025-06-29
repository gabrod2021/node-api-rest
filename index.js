import express from 'express'
import { products } from './products.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/products/', (req, res) => {
    res.json(products);
     });

app.get('/products/search', (req, res) => {
    console.log(req.query);
    const {nombre} = req.query;
    const filteredProducts = products.filter((p) => 
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
);
res.json(filteredProducts);

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

app.post('/products', (req, res) => {
    console.log(req.body);
    const {nombre, precio, cantidad} = req.body;
    const newProduct ={
        id: products.length + 1,
        nombre,
        precio,
        cantidad
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
    
});
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex == -1){
        return res.status(404).json({error:'No existe el producto'});
    }

    const {precio, cantidad} = req.body;

    products[productIndex] = {id: productId, precio, cantidad};
    res.json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex == -1){
        return res.status(404).json({error:'No existe el producto'});
    }
    products.splice(productIndex,1);
    res.status(204).send();
    
});

app.use((req,res,next) => {
    res.status(404).json({error: 'Not found'});

})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});