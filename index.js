import "dotenv/config";
import express from 'express'
import cors from 'cors';
import productRouter from './src/routes/products.router.js';
import authRouter from './src/routes/auth.router.js';


const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);

app.use((req, res, next) => {
    next();
});

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a la API REST" });
});

app.use('/api/products',productRouter);

app.use((req, res, next) => {
    res.status(404).json({error: 'Not found'});
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

