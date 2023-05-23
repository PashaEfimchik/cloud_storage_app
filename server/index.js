const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();
const PORT = config.get('serverPort') || 5000;

app.use(corsMiddleware);
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        });
    } catch (e) {
        console.log('Server Error', e.message);
    }
}

start().then(r => console.log('Server started'));