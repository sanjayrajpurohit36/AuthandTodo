module.exports = function (mysql) {
    // create db connection
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
    })  
}
