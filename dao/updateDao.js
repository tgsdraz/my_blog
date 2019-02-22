let daoUtil = require('./daoUtil')

function updateDo(id,hasDo,success){
    let updateSql = `update artical set has_do=? where id=?`
    let params = [hasDo,id]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(updateSql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
function updateRead(id,hasRead,success){
    let updateSql = `update artical set has_read=? where id=?`
    let params = [hasRead,id]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(updateSql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}

module.exports.updateDo = updateDo
module.exports.updateRead = updateRead