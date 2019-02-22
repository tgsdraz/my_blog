let daoUtil = require('./daoUtil')

function insertRegUser(username,password,ctime,success){
    let params = [username,password,ctime]

    let insertSql = `insert into users(username,password,ctime) values(?,?,?)`
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(insertSql,params,(error,result) => {
        if(error == null){
            success(result)
        }else{
            throw new Error(error)
        }
    })
    connection.end()
}

module.exports.insertRegUser = insertRegUser