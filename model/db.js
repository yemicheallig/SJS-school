const mysql = require('mysql')
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sjsschool'
})
con.connect(err=>{
    if(err) throw err
    console.log('DB connected successfully!')
})

module.exports = con