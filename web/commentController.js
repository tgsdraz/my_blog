
let path = new Map()
let commentDao = require('../dao/commentDao')
let dateUtil = require('../utils/dateUtil')
let respUtil = require('../utils/resp')
let url = require('url')
function insertCommentsById(request,response){
    request.on('data',(data) => {
        let temp = JSON.parse(data.toString())
        console.log(temp)
        commentDao.insertCommentById(temp.id,temp.name,temp.comment,dateUtil.dateUtil(),dateUtil.dateUtil(),temp.parent,temp.parentName,(resp) => {
            response.writeHead(200)
            response.write(respUtil.responseData(200,'添加成功',null))
            response.end()
        })

    })
    
}
function queryCommentById(request, response) {
    let params = url.parse(request.url, true).query
    commentDao.queryCommentById(params.id, (resp) => {
            response.writeHead(200)
            response.write(respUtil.responseData(200, '查询成功', resp))
            response.end()
    })

}
function insertCommentByParent(request, response) {
    let params = url.parse(request.url, true).query
    commentDao.queryCommentById(params.id, (resp) => {
            response.writeHead(200)
            response.write(respUtil.responseData(200, '查询成功', resp))
            response.end()
    })

}
function queryCommentCount(request, response) {
    let params = url.parse(request.url, true).query
    commentDao.queryCommentCount(params.id, (resp) => {
            response.writeHead(200)
            response.write(respUtil.responseData(200, '查询成功', resp))
            response.end()
    })

}


path.set('insertCommentsById',insertCommentsById)
path.set('queryCommentById',queryCommentById)
path.set('queryCommentCount',queryCommentCount)
module.exports.path = path