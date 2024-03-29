const router = require('express').Router();
const client = require('../src/dbconnect');

//GET ALL CUSTOMERS
router.get('/testGet', async(req, res)=>{
    try {
        client.connect()
        const customers = client.db('persons').collection('customers')
        const data = await customers.find().toArray()
        res.send(data)
    } catch (error) {
        console.log(error);
    }
} )

module.exports = router;