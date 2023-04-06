require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');

// const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

// async function cxnDB(){

//   try{
//     client.connect; 
//     const collection = client.db("course-project").collection("user-info");

//     // const collection = client.db("papa").collection("dev-profiles");
//     const result = await collection.find().toArray();
//     //const result = await collection.findOne(); 
//     console.log("cxnDB result: ", result);
//     return result; 
//   }
//   catch(e){
//       console.log(e)
//   }
//   finally{
//     client.close; 
//   }
// }

app.get('/', async (req, res) => {
    //res.send('hey this is she! <br/>');
  
    //let result = await cxnDB().catch(console.error); 
  
    res.render('views/index');
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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${ PORT }`)
  })