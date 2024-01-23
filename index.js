const express = require('express')

const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port =process.env.PORT || 5000;

const app = express() 

//Midlewire
app.use(cors())
app.use(express.json()) //req.body undifint solved






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vxtilvy.mongodb.net/?retryWrites=true&w=majority`



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database =client.db('OurWebsite')
    const productOptionCallection = database.collection('productOptions')

const productCollection =database.collection('Product')

const ordersCollection =database.collection('orders')

  //Products
    app.post('/products',async(req,res)=>{
      const product =req.body;
      const resust =await productCollection.insertOne(product);
      res.send(resust)
     
    }) 

    app.get('/products',async(req,res)=>{

      const queray ={};
      const options = await productCollection.find(queray).toArray()
      res.send(options)
    })
    //Orders
    app.post('/orders',async(req,res)=>{
      const orders =req.body;
      console.log(orders);
       const resust =await ordersCollection.insertOne(orders);
      res.send(resust) 
     
    }) 
    app.get('/orders',async(req,res)=>{

      const queray={};
      const orders = await ordersCollection.find(queray).toArray()
      res.send(orders)
    })







  } finally {

    //await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello all Castomar')
})

app.listen(port, () => {
  console.log(`Ours Wabsite is on:${port}`)
})