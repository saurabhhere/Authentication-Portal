const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

const usersRoute = require('./Routes/User');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE"
}));

app.use('/api/users', usersRoute);

app.use('/', (req, res) => {
    res.send('Spark Server is running')
})

mongoose.connect(process.env.CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));
