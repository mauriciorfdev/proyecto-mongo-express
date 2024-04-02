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
app.use('/customers', router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server listen on port ... ', PORT) )
