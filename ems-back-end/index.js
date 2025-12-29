// load env file
require('dotenv').config()

const express = require('express')
const cors = require('cors')
require('./db/connection')
const router = require('./Route/router')
const path = require('path');


const server = express()
const PORT= 4000||process.env.PORT


server.use(cors())
server.use(express.json())
server.use(router)
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));


server.listen(PORT,()=>{
    console.log(`EMS Server started at port number ${PORT}`);
    
})

server.get('/',(req,res)=>{
    res.send("EMS Server Started")
})