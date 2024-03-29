require('dotenv').config();
const { ObjectId } = require('mongodb');
const client = require('./src/dbconnect');
const express = require('express');
const router = require('./routes/customers')
const app = express();


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//GET ALL CUSTOMERS FROM DB USING ROUTER 
app.use('/api', router)


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


//UPDATE A CUSTOMER
app.patch('/:id', async(req, res)=>{
    try {
        client.connect();
        const coll = client.db('persons').collection('customers')
        const query = {id: parseInt(req.params.id)}
        const updatedData = {$set: req.body}
        await coll.updateOne(query, updatedData)
        const x = await coll.find().toArray()
        res.json(x)
    } catch (e) {
        console.log(e);
    }
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server listen on port ... ', PORT) )
