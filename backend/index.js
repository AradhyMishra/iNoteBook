const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();


const app = express()
const port = 5000

app.use(cors())
// Middleware to parse JSON request bodies
app.use(express.json()); // This line is necessary for handling JSON requests

//Available routes or endpoints, the route we have specified in the require will contain the callback function of req
// and response, which will be used to store or read data from the user.
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})