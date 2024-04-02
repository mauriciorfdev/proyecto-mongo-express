const router = require('express').Router();
const { ObjectId } = require('mongodb');
const client = require('../src/dbconnect');

//GET ALL CUSTOMERS
router.get('/', async(req, res)=>{
    try {
        client.connect()
        const customers = client.db('persons').collection('customers')
        const data = await customers.find().toArray()
        res.send(data)
        console.table(data)
    } 
    catch (e) {
        console.log(e);
    }
} )

//GET A CUSTOMER BY ID
router.get('/id/:id', async (req, res)=>{
    try {
        const id = parseInt(req.params.id)
        client.connect()
        const customers = client.db('persons').collection('customers')
        const query = {id: id};
        const found = await customers.findOne(query)
        if (found){
            return res.send(found);
        }else{
            return res.send({msg:`NO USER WITH ID: ${id}`});
        }
    } 
    catch (e) {
        console.log(e);    
    }
})

//GET A CUSTOMER BY OBJECT ID
router.get('/objectId/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        if( !ObjectId.isValid(id) ){
            return res.send({msg: 'ID NO VÁLIDO !'})
        }

        client.connect()
        const customers = client.db('persons').collection('customers')
        const query = {_id: new ObjectId(id)}
        const found = await customers.findOne(query)
        if (found){
            return res.send(found)
        }else{
            return res.send({msg: `NO USER WITH ID ${req.params.id}`})
        }
    } 
    catch (e) {
        console.log(e);
    }
})


//INSERT A CUSTOMER
router.post('/', async (req, res)=>{
    try {
        client.connect()
        const customers = client.db('persons').collection('customers')
        const newCustomer = {
            name: req.body.name,
            email: req.body.email    
        }
        const result = await customers.insertOne(newCustomer)
        res.send(result)
        const data = await customers.find().toArray()
        console.table(data)
    }
    catch (e) {
        console.log(e);
    }
})



module.exports = router;