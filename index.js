import "dotenv/config";
import express from 'express'
import cors from 'cors';
import productRouter from './src/routes/products.router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    next();
});
app.use('/api/products',productRouter);

app.use((req, res, next) => {
    res.status(404).json({error: 'Not found'});
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

