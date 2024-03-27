require('dotenv').config();
const { ObjectId } = require('mongodb');
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

//GET A SINGLE USER (BY OBJECT ID)
app.get('/single', async (req, res)=>{
    try {
        client.connect()
        const db = client.db('persons')
        const collection = db.collection('customers')
        const query = new ObjectId('6600d22e130d748a849e275c') //id=1
        const found = await collection.findOne(query)
        found ? res.send(found) : res.send({msg:'NOT FOUND!'})
        console.log(found);
    }
    catch(e){
        console.log(e);
    }
})
//GET A USER BY ID
app.get('/:id', async (req, res)=>{
    try {
        const id = parseInt(req.params.id)
        client.connect();
        const db = client.db('persons');
        const collection = db.collection('customers');
        const query = {id: id};
        const found = await collection.findOne(query);
        found ? res.send(found) : res.send({msg:`NO USER WITH ID: ${id}`})
    } catch(e){
        console.log(e);
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

//DELETE A CUSTOMER
app.delete('/:id', async (req, res)=>{
    try {
        const id = (req.params.id);
        if( !ObjectId.isValid(id) ){
            return res.send({msg:'ID NO VALIDO !'});
        }

        client.connect();
        const query = {_id: new ObjectId(id)};
        const coll = client.db('persons').collection('customers');
        result = await coll.findOne(query);
        
        if(result){//delete one...
            deleted = await coll.deleteOne(result)
            return res.json(deleted); 
        }else{
            return res.json({msg:'NOT FOUND - (ID OK)'});
        }
    } catch (e) {
        console.log(e);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server listen on port ... ', PORT) )
