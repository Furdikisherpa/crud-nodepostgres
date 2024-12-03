import express from 'express';
import cors from 'cors'
import clientRoutes from "./routes/clientRoute.js"

const app = express();
const port= 3000;

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);

app.get('/', (req, res) => {
    res.send(`<h1> Hello backend </h1>`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

