var express = require("express")
var mysql = require("mysql")
var app = express()

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoes'
})


con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})

// La route get
app.get('/', (req, res)=>{
    res.send('Hello');
})


app.get('/api/chaussures', (req, res)=>{
    
    con.query('SELECT * FROM chaussures',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
});

app.get('/api/chaussure/:id', (req, res)=>{
    
    con.query('SELECT * FROM chaussures WHERE id_chaussure=?',[req.params.idxChaussure],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})

// envoyer des requetes post

// Ajout d'une nouvelle chaussure dans la bd

app.post('/api/chaussure/add', (req, res)=>{
    const  id_marque = req.body. id_marque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    

    
    con.query('INSERT INTO chaussures VALUES(NULL,?,?,?,?)',[id_marque,taille,couleur,prix],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('qjout de nvelles chaussures');
    }
    })
})

// Ajout d'une nouvelle marque de chaussure dans la bd

app.post('/api/marque/add', (req, res)=>{
    const nom_de_la_marque = req.body.nom_de_la_marque;
    const logo = req.body.logo;

    con.query('INSERT INTO marque VALUES(NULL,?,?)',[nom_de_la_marque,logo],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('ajout de nvelles marque');
    }
    })
})

// paramétrage du port de lecture
app.listen(4500, (err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('on port 4500');
    }
})