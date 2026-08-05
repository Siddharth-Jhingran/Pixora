const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

app.use(cookieParser());
app.use(express.json());


    allowedOrigins = ["https://pixora-azure-seven.vercel.app", "http://localhost:5173"]



app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);


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