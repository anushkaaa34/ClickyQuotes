const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Info = require('./models/info');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();

const dbURI = "mongodb://somee:test123@ac-tw9pj2i-shard-00-00.nm1bope.mongodb.net:27017,ac-tw9pj2i-shard-00-01.nm1bope.mongodb.net:27017,ac-tw9pj2i-shard-00-02.nm1bope.mongodb.net:27017/?ssl=true&replicaSet=atlas-k4qpcy-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=> console.log('connected to db'))
    .catch((err)=> console.log(err));



app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/subscribe' , (req,res)=>{
    res.sendFile(__dirname + '/subscribe.html');
});

// req.session.username = req.body.username;

app.post('/subscribe', (req,res)=>{

    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.psw;

    const info = new Info ({
        name : name,
        email : email,
        password : pass,
    })

    info.save()
     .then((result)=>{
        res.redirect('/subscribe')
     })
     .catch((err) =>{
        console.log(err);
     })
    
         
    //return res.redirect('/subscribe');
})

// to print username 
app.get('/', (req, res) => {
    Info.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('subscribe', { info: result.name });
      })
      .catch(err => {
        console.log(err);
      });
});

// to send email

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'dummya81741515@gmail.com',
    pass: 'enzl awbd dqhk wdjx'
  }
});

var mailOptions = {
  from: ' ',
  to: '',
  subject: 'mind freshing quotes from ClickyQuotes',
  text: ''
};

transporter.sendMail(mailOptions, function(error,info){
  if(error){
    console.log(error);
  }else{
    console.log('Email sent: ' + info.response);
  }
});




const port = 3000;
app.listen(port, ()=> console.log(`This app is listening on port ${port}`))