let daoUtil = require('./daoUtil')

function insertBlog(type,title,tags,content,hasread,hasdo,commentCount,ctime,utime,success){
    let insertSql = `insert into artical(type,title,tags,content,has_read,has_do,comment_count,ctime,utime) values(?,?,?,?,?,?,?,?,?)`
    let params = [type,title,tags,content,hasread,hasdo,commentCount,ctime,utime]
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
function insertTags(blog_id,tag,ctime){
    let insertSql = `insert into tags(blog_id,tag,ctime) values(?,?,?)`
    let params = [blog_id,tag,ctime]
    let connection = daoUtil.createConnection()
    connection.connect()
    connection.query(insertSql,params,(error,result) => {
        if(error == null){
            console.log(result)
        } else {
            throw new Error(error)
        }
    })
    connection.end()
}
function queryBlogsAll(page,pageSize,success){
    let querySql = `select * from artical order by ctime asc limit ?,?`
    let params = [(page-1)*pageSize,pageSize]

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
function queryBlogsCount(success){
    let querySql = `select count(1) as count from artical`
    let params = []

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
function queryArticlesByType(type,page,pageSize,success){
    let querySql = `select * from artical where type=? limit ?,?`
    let params = [type,(page-1)*pageSize,pageSize]

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
function queryCountByType(type,success){
    let querySql = `select count(1) as count from artical where type=?`
    let params = [type]

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
function queryArticlesById(id,success){
    let querySql = `select * from artical where id=?`
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
function queryAllId(success){
    let querySql = `select * from artical`
    let params = []

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
module.exports.insertBlog = insertBlog
module.exports.insertTags = insertTags
module.exports.queryBlogsAll = queryBlogsAll
module.exports.queryBlogsCount = queryBlogsCount
module.exports.queryArticlesByType = queryArticlesByType
module.exports.queryCountByType = queryCountByType
module.exports.queryArticlesById = queryArticlesById
module.exports.queryAllId = queryAllId