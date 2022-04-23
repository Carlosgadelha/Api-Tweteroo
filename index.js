import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors())

let usuarios = []
let tweets = []


app.post('/sign-up', (req, res) => {
    const usuario = req.body
    usuarios = [... usuarios, usuario]
    res.send("OK")
});

app.post('/tweets', (req, res) => {
    const tweet = req.body
    tweets = [... tweets, tweet]
    res.send("OK")
});

app.get('/tweets', (req, res) => {
    let tweetsFiltrados = []
    tweets.forEach(tweet => {
        usuarios.find(usuario => {
            if(usuario.username === tweet.username){
                tweetsFiltrados = [... tweetsFiltrados,{
                    username: tweet.username,
                    avatar: usuario.avatar,
                    tweet: tweet.tweet
                }]
            }})
    })
    res.send(tweetsFiltrados)
});

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
