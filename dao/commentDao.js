let daoUtil = require('./daoUtil')

function insertCommentById(id,comment,name,ctime,utime,parent,parentName,success){
    let insertSql = `insert into comment(blog_id,alise,comment,ctime,utime,parent,parent_name) values(?,?,?,?,?,?,?)`
    let params = [id,comment,name,ctime,utime,parent,parentName]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(insertSql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
function insertCommentByParent(id,comment,name,ctime,utime,parent,success){
    let insertSql = `insert into comment(blog_id,alise,comment,ctime,utime,parent) values(?,?,?,?,?,?)`
    let params = [id,comment,name,ctime,utime,parent]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(insertSql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
function queryCommentById(id,success){
    let querySql = `select * from comment where blog_id=? order by ctime desc`
    let params = [id]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
function queryCommentCount(id,success){
    let querySql = `select count(1) as count from comment where blog_id=?`
    let params = [id]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
module.exports.insertCommentById = insertCommentById
module.exports.queryCommentById = queryCommentById
module.exports.queryCommentCount = queryCommentCount