const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const actorsRoutes = require('./routes/actors');
const exportFoliosRoutes = require('./routes/exportFolios');
const app = express();
const cors = require('cors');
require('dotenv').config();



app.use(cors());
app.use(express.json());
app.use('/actors', actorsRoutes);
app.use('/exportfolios', exportFoliosRoutes);
app.use('/users', usersRoutes);
app.use('/', authRoutes);


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