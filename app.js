require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');

const path = require('path');
// npm i path download!!^^


const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));


//app.use(express.static(path.join()))

// app.set('styles', path.join(__dirname, 'styles'));
//app.use(express.staticpath.join((__dirname, 'styles')));

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

//app.use(express.static(__dirname + './styles/styles.css'));

//app.use(express.static("public"));

app.get('/', async (req, res) => {
  //res.send('his this is she! <br/> <a href="mongo">mongo</a>');

  let result = await cxnDB().catch(console.error); 

  res.render('index', {
  nameData : result,
  });
})



app.get('/mongo', async (req, res) => {

  // res.send("check your node console, bro");

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[2].username); 

  // res.send(`here ya go, joe. ${ result[2].username }` ); 

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


app.get('/kristinaPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  //res.redirect('/kristina')
  res.render('kristina', {
    nameData : result
    });
    // dbname = db.collection.find().sort({_id:-1});
    // return dbname;

})

app.get('/rachelPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 
  
  res.render('rachel',{
    nameData : result
  });
})

app.get('/meghanPage', async (req, res) => {

  let result = await cxnDB().catch(console.error); 
  
  res.render('meghan',{
    nameData : result
  });
})



app.post('/deleteName/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("unaAdventures").collection("user-info");
    let result = await collection.findOneAndDelete( 
      {
        "_id": new ObjectId(req.params.id)
      }

    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})


  // app.post('/updateName/:id', async (req, res) => {

  //   try {
  //     console.log("req.parms.id: ", req.params.id) 
  
  //     client.connect; 
  //     const collection = client.db("unaAdventures").collection("user-info");
  //     let result = await collection.findOneAndUpdate( 
  //       { "_id": new ObjectId(req.params.id) }, {$set: {name: "new name" }} )
  
  //     .then(result => {
  //       console.log(result); 
  //       res.redirect('/');
  //     })
  //     .catch(error => console.error(error))
  //   }
  //   finally{
  //     //client.close()
  //   }
  
  // })

  // app.post('/updateSecret/:id', async (req, res) => {

  //   try {
  //     console.log("req.parms.id: ", req.params.id) 
  
  //     client.connect; 
  //     const collection = client.db("unaAdventures").collection("user-info");
  //     let result = await collection.findOneAndUpdate( 
  //       { "_id": new ObjectId(req.params.id) }, {$set: {secret: "you can park anywhere on campus after 4:30" }} )
  
  //     .then(result => {
  //       console.log(result); 
  //       res.redirect('/');
  //     })
  //     .catch(error => console.error(error))
  //   }
  //   finally{
  //     //client.close()
  //   }
  
  // })

  //do insert many and just add all secrets at once??

  app.post('/updateSecret/:id', async (req, res) => {

    try {
      console.log("req.parms.id: ", req.params.id) 
  
      client.connect; 
      const collection = client.db("unaAdventures").collection("user-info");
      let result = await collection.findOneAndUpdate( 
        { "_id": new ObjectId(req.params.id) }, {$set: {secret: "you can park anywhere on campus after 4:30" }} )
  
      .then(result => {
        console.log(result); 
        res.redirect('/');
        return secret;

      })
      .catch(error => console.error(error))
    }
    finally{
      //client.close()
    }
  
  })

 


/* <form action="FirstPage.html">
    <button type="button" href="kristina.html" class="btn">Basic</button>
</form> }*/

// function StartFunction() {
//     var T = document.getElementById("start"),
//         displayValue = "";
//     if (T.style.display == "")
//         displayValue = "none";

//     T.style.display = displayValue;
// }

console.log('in the node console');

app.listen(PORT, () => {
    console.log(`Example app listening on port ${ PORT }`)
  })