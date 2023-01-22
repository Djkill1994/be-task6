require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({extended: true}));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/messages', require('./src/routes/messages'));

const PORT = process.env.PORT;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });
        app.listen(PORT, () =>
            console.log(`App has been started on port ${PORT}...`)
        );
    } catch (e) {
        console.log('Oops, server error', e.message);
        process.exit(1);
    }
};

start();