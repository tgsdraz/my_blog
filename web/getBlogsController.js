
let path = new Map()
let url = require('url')
let writeBlogDao = require('../dao/writeBolgDao')
let respUtil = require('../utils/resp')
function getAll(request,response){
    let params = url.parse(request.url,true).query
    writeBlogDao.queryBlogsAll(parseInt(params.page),parseInt(params.pageSize),(data) => {
        if(data != null && data.length > 0){
            response.writeHead(200)
            response.write(respUtil.responseData("success","获取成功",data))
            response.end()
        }
    })
    
}

function getCount(request,response){
    writeBlogDao.queryBlogsCount((data) => {
        response.writeHead(200)
        response.write(respUtil.responseData("success","获取成功",data))
        response.end()
    })
}

path.set('getAll',getAll)
path.set('getCount',getCount)
module.exports.path = path