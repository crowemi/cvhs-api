require('dotenv').config()
const express = require('express');
require('./storage');


const app = express();
app.use(express.json());
const port = 3005;

app.post('/', (req, res) => {
    // 1. check the submitted last name is part of the class
    // 2. check that they haven't previously registered
    // 3. add to registry
    console.log(req.body)
    firstName = req.body.firstName
    lastName = req.body.lastName
    email = req.body.email
    ret = validate_registry(firstName, lastName)
    res.send('Hello World! From Express.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})