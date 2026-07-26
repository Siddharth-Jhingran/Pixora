const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());
app.use(express.json());

//defination
const authRouter = require('./routers/auth.routes.js');
const postRouter = require('./routers/post.routes.js');
const followRouter = require('./routers/follow.routes.js');

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', followRouter)

app.get('/', (req, res) => {
    res.send('Hello sir, welcome to Pixora API');
});


module.exports = app;