let mysql = require('mysql')

function createConnection(){
    let connection = mysql.createConnection({
        host:'192.168.1.100',
        port:3306,
        user:'root',
        password:'qaz123,./',
        database:'my_blog'
    })
    return connection
}

module.exports.createConnection = createConnection