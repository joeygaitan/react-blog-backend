const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use('/blogs', require('./MVC/routes/blogs'))

//shows the errors from the routes
app.use((err,req,res,next)=>{
    console.log(err)
    const status = err.status || 404 
    res.status(status).json({ error: err })
})

//default route error
app.use((req,res,next)=> res.status(404).json({error: {type: 404, message: `route not found`}}))

//listenign for the open port
app.listen(port,()=>console.log(`listening on port ${port}`))

module.exports = app 

