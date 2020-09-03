//q9DOof16oIlILGQ1
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Bigleaper!!')
})

//DB connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err))


//Server lift
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})