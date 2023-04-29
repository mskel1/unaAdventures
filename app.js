require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const nodemailer = require('nodemailer')

const path = require('path');
// npm i path download!!^^


const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));


async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("unaAdventures").collection("user-info");

    // const collection = client.db("papa").collection("dev-profiles");
    const result = await collection.find().toArray();
    //const result = await collection.findOne(); 
    console.log("cxnDB result: ", result);
    return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}



app.get('/', async (req, res) => {
  //res.send('his this is she! <br/> <a href="mongo">mongo</a>');

  let result = await cxnDB().catch(console.error); 

  res.render('index', {
  nameData : result,
  });
})



app.get('/mongo', async (req, res) => {


  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[2].username); 
 

})

app.post('/addName', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("unaAdventures").collection("user-info");
    await collection.insertOne(req.body);
      
    //allows the page to refresh auto
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})

app.get('/indexPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  
  res.render('index', {
    nameData : result
    });


})


app.get('/storyPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  
  res.render('story', {
    nameData : result
    });


})

app.get('/statusPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  
  res.render('status', {
    nameData : result
    });


})



app.post('/deleteName/:id', async (req, res) => {

  try {
    //console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("unaAdventures").collection("user-info");
    let result = await collection.findOneAndDelete( 
      {
        "_id": new ObjectId(req.params.id)
      }
      
    )
    .then(result => { 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})


  //do insert many and just add all secrets at once??

  app.post('/updateSecret/', async (req, res) => {

    try {
      //console.log("req.body.id: ", req.body.id) 
      console.log("req.body.newSecret: ", req.body.newSecret) 
  
      client.connect; 
      const collection = client.db("unaAdventures").collection("user-info");
      let result = await collection.findOneAndUpdate( 
        { "_id": new ObjectId(req.body.id) }, {$push: {secrets: req.body.newSecret }} )
  

      .then(result => {
        // console.log(result); 
        res.redirect('/statusPage');
        //return secret;

      })
      .catch(error => console.error(error))
    }
    finally{
      //client.close()
    }
  
  })

  app.post('/gmail', (req, res) => {

    let request = req.body; 
    let atCarrier = ''; 
  
    switch (request.carrier) {
      case 'att':
        atCarrier = "@txt.att.net";
        break;
      case 'verizon':
        atCarrier = "@vtext.com	";
        break;
    }

    let transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'krisew10@gmail.com',
        pass: process.env.APP_PWD
      }
    });
  
    var mailOptions = {
      from: 'krisew10@gmail.com',
      to: request.phoneNumber + atCarrier, 
      text: request.message,
      subject: 'Sending Email using Node.js from unaAdventures app',
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect('/');
  
  })



  // function showSecret() {
  //   var secretBtn = document.getElementById("myDIV");
  //   if (secretBtn.style.display === "none") {
  //     secretBtn.style.display = "block";
  //   } else {
  //     secretBtn.style.display = "none";
  //   }
  // }

 


console.log('in the node console');

app.listen(PORT, () => {
    console.log(`Example app listening on port ${ PORT }`)
  })