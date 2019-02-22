let daoUtil = require('./daoUtil')

function queryPwdByUsername(username,success){
    let connection = daoUtil.createConnection()
    let querySql = `select * from users where username=?`
    let params = [username]
    connection.connect()

    connection.query(querySql,params,(error,result) => {
        if(error == null){
            console.log(result)
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
    
}

module.exports.queryPwdByUsername = queryPwdByUsername