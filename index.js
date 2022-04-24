import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors())

let usuarios = []
let tweets = []


app.post('/sign-up', (req, res) => {
    const usuario = req.body

    if(usuario.username === '' || usuario.avatar === ''){
        res.sendStatus(400)
    }else{
        usuarios = [... usuarios, usuario]
        res.send("OK")
    }
    
});

app.post('/tweets', (req, res) => {
    
    if(req.body.tweet === ''){
        res.sendStatus(400, "Todos os campos são obrigatórios!")
    }
    req.header('User', req.body.user)
    const tweet = req.body
    tweets = [... tweets, tweet]
    res.sendStatus(201)
    res.send("OK")
});

app.get('/tweets:page', (req, res) => {
    const {page} = req.params
    if(parseInt(page) > 1){

        if (tweets.length > 10) tweets = tweets.slice(tweets.length - 10, tweets.length)

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

    } else{
        res.sendStatus(400, "Informe uma página válida!")
    }
    let tweetsFiltrados = []

    
    res.send(tweetsFiltrados)
});

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
