const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usermanagement'
});
db.connect((error) => {
    if (error) throw error;
    console.log("mysql is connected");
})


app.get('/', (req, res) => {
    try {
        const query = 'select * from  user ';
        db.query(query, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            res.status(201).send(rows);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post("/createuser", (req, res) => {
    try {

        const query = 'INsert INTO user SET ?';
        db.query(query, req.body, (err, rows, fields) => {
            if (err) {
                throw err.message;
            }
            res.status(200).send(rows);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.post("/update/:date", (req, res) => {
    try {
        const { firstname, lastname, email,phone,status,date } = req.body;
        // const { ffirstname, llastname, eemail,pphone,sstatus,ddate } = req.params;
        
        let setcondtion = `?`;
        let whareCondtion = '?';

        if (firstname) {
            setcondtion = 'firstname = "'+firstname+'"'
            whareCondtion = 'firstname = "'+firstname+'"'
        }
        if (lastname) {
            setcondtion = setcondtion + 'lastname = "'+lastname+'"',
            whareCondtion = 'lastname = "'+lastname+'"'
        }
        if (email) {
            setcondtion = setcondtion + 'email = "'+email+'"'
            whareCondtion = 'email = "'+email+'"'
        }
        if(phone){
            setcondtion = setcondtion +'phone = "'+phone+'"'
            whareCondtion = 'phone = "'+phone+'"'
        }
        if (status) {
            setcondtion = setcondtion + 'status = "'+status+'"'
            whareCondtion = 'status = "'+status+'"'
        }
        if (date) {
            setcondtion = setcondtion + 'date = "'+date+'"'
            whareCondtion = 'date = "'+date+'"'
        }

        const query = `UPDATE user SET ${setcondtion} where  ${whareCondtion}`;
        console.log(query);
        db.query(query,function (err, rows,fields) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(rows);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})
app.get("/like",(req,res) => {
    try {
            const firstname = req.query.firstname;
            console.log(firstname);
            const query = 'SELECT * FROM user WHERE firstname LIKE "'+firstname+'%"';
            console.log(query);
            db.query(query,function (err, rows,fields) {
                if (err) {
                    res.send(err.message);
                } else {
                    res.send(rows);
                }
            });
    } catch (error) {
        res.status(400).send(error.message);
    }

});
app.delete("/delete/(:id)", (req, res) => {
    try {
        const delet = { id: req.params.id }
        db.query('DELETE FROM user WHERE id = ' + delet, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            res.status(200).send(rows);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/and", (req, res) => {
    try {
        const query = 'select * from  user where status = "active"  AND  firstname = "Noah"';
        db.query(query, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            res.status(201).send(rows);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/or", (req, res) => {
    try {
        const query = 'select * from  user where status = "active"  Or  firstname = "Noah"';
        db.query(query, (err, rows, fields) => {
            if (err) {
                throw err;
            }
            res.status(201).send(rows);
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/not", (req, res) => {
    try {
        const query = 'select * from  user where NOT status = "deactive"';
        db.query(query, (err, rows, fields) => {
            if (err) {
                throw err
            }
            res.status(200).send(rows);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/oderby",(req,res) => {
    try {
        const query = 'SELECT * FROM user ORDER BY phone DESC'
        db.query(query,(err,rows,fields)=>{
            if (err) {
                throw err
            }
            res.status(200).send(rows);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(3000, () => {
    console.log("this site port number 3000");
});


// const query = 'UPDATE `user` SET ? WHERE ?';
        // db.query(query, [req.body, req.params], function (err, rows) {
        //     if (err) {
        //         console.log(err.message);
        //     } else {
        //         res.send(rows);
        //     }
        // });
