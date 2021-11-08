const express = require('express');
const app = express();
const studentRoutes = require('./src/student/routes')
const port = process.env.Port || 3000;
const bodyParser = require('body-parser');


// const server = http.createServer(app);
// app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-RequestedWith,Content-Type,Accept,Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        res.status(200).json({})
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/students", studentRoutes);
app.get("/", (req, res) => {
    res.send('Orders were fetched.');
})
app.listen(port);