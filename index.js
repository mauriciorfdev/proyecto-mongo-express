require('dotenv').config();
const client = require('./src/dbconnect');
const express = require('express');
const app = express();


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//GET ALL CUSTOMERS
app.get('/', async (req, res)=>{
    try{
        client.connect()
        const db = client.db('persons')
        const customers = db.collection('customers')
        const data = await customers.find().toArray();
        res.send(data)
        console.table(data);
    }
    finally{
    }
})

//INSERT A CUSTOMER
app.post('/', async (req, res)=>{
    try{
        client.connect()
        const db = client.db('persons')
        const collection = db.collection('customers')
        const newCustomer = {
            name: req.body.name,
            email: req.body.email,
        }
        const result = await collection.insertOne(newCustomer);
        const data = await collection.find().toArray();
        res.send(result)
        console.table(data)

    }
    catch(e){
        console.log(e);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server listen on port ... ', PORT) );
