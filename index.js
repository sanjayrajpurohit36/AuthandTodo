const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const routes = require("./config/routes");
// const db = require("./config/dbConfig");

const app = express();
const router = express.Router();
app.use(cors());

// for Database
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '', 
    database: 'acquiredb'
});

// connect to db
db.connect((err) => {
    if(err) { 
        console.log("error in connecting db at dbConfig", err);
        throw err;
    }
    console.log("Db is connected!!");
    app.db = db
    routes(router,app.db);
})  

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.use("/api", router);


app.listen('3000', () => {
    console.log("Hey! my server is running at the port 3000");
})
