const express = require('express'); 
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true})) 

MongoClient.connect('mongodb+srv://admin:im5967im@cluster0.xtntkvz.mongodb.net/?retryWrites=true&w=majority', function(err, client){
    app.listen('8080', function(){
        console.log('listening on 8080');
    });
    
});

app.use(express.static('public'));

app.get('/', function(req, res) { 
    res.sendFile(__dirname +'/views/start.html')

  })

app.get('/inputs', function(req, res) { 
    res.sendFile(__dirname +'/views/inputs.html')

  })

app.post('/man-add',function(req, res){
    console.log(req.body.man);
})

app.post('/woman-add',function(req, res){
    console.log(req.body.woman);
})

    // app.listen('8080', function(){
    //     console.log('listening on 8080');
    // });
