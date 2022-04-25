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
        res.status(400).send("Todos os campos são obrigatórios!")
    }else{
        usuarios = [... usuarios, usuario]
        res.status(201).send("OK")
    }
    
});

app.post('/tweets', (req, res) => {
    if(req.body.tweet === ''){
        res.status(400).send("Todos os campos são obrigatórios!")
    }else{

        tweets = [... tweets, {
            username: req.headers.user,
            tweet: req.body.tweet
        }]
        
        res.status(201).send("OK")
    }
    
});

app.get('/tweets:USERNAME', (req, res) => {
    let tweetsFiltrados = []
    const user = req.params.USERNAME;

    tweets.forEach(tweet => {
        usuarios.find(usuario => {
            if(user === tweet.username){
                tweetsFiltrados = [... tweetsFiltrados,{
                    username: tweet.username,
                    avatar: usuario.avatar,
                    tweet: tweet.tweet
                }]
            }})
    })

    res.send(tweetsFiltrados)


})

app.get('/tweets', (req, res) => {
    
    const page = parseInt(req.query.page)
    
    let tweetsFiltrados = []
    let posisaoFinal = 0;
    let posisaoInicial = 0;

    if(page > 0){ 

        if(page === 1){
            posisaoFinal = tweets.length 
            posisaoInicial = tweets.length - 10
        }else{
            posisaoFinal = page * 10 
            posisaoInicial = (tweets.length - (page * 10))+1
        }

        if (tweets.length > 10) tweets = tweets.slice(posisaoInicial, posisaoFinal)

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

    } else{
        res.status(400).send("Informe uma página válida!")
    }
     
});

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
