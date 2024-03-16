require('dotenv').config()
const client = require('./src/dbconnect')
const express = require('express')
const app = express()


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log('server listen on port ... ', PORT);
})
