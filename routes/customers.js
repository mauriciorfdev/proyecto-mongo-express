const router = require('express').Router();
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
router.get('/:id', async (req, res)=>{
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



module.exports = router;