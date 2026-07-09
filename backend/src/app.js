const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.routes.js');
const postRouter = require('./routers/post.routes.js');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.get('/', (req, res) => {
    res.send('Hello sir, welcome to Pixora API');
});


module.exports = app;