const express = require("express");
const app = express();
const router = require("./router")

app.use(express.json());

//ROUTER


app.use('/api',router)

app.use((err,req,res,next)=>{
  res.status(500).send(err.message)
})


module. exports = app;