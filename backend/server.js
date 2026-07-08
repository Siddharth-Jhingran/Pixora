require('dotenv').config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = require('./src/app');

const connectDB = require('./src/config/connectDB.js');

connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello sir, welcome to Pixora API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
