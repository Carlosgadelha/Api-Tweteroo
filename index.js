import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())
let usuarios = []


app.post('/sign-up', (req, res) => {
    const usuario = req.body
    usuarios = [... usuarios, usuario]
    console.log(usuarios);
    res.send("OK")
});




app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
