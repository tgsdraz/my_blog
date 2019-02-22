let path = new Map()
let url = require('url')
let writeBlogDao = require('../dao/writeBolgDao')
let respUtil = require('../utils/resp')

function getArticles(request, response) {
    let params = url.parse(request.url, true).query
    writeBlogDao.queryArticlesByType(params.type, parseInt(params.page),parseInt(params.pageSize), (data) => {
        response.writeHead(200)
        response.write(respUtil.responseData("success", "获取成功", data))
        response.end()
    })

}

function getCountByType(request, response) {
    let params = url.parse(request.url, true).query
    writeBlogDao.queryCountByType(params.type, (data) => {
        response.writeHead(200)
        response.write(respUtil.responseData("success", "获取成功", data))
        response.end()
    })

}
function getArticleById(request, response) {
    let params = url.parse(request.url, true).query
    writeBlogDao.queryArticlesById(params.id, (data) => {
        response.writeHead(200)
        response.write(respUtil.responseData("success", "获取成功", data))
        response.end()
    })

}
function getAllId(request, response) {
    let params = url.parse(request.url, true).query
    writeBlogDao.queryAllId((data) => {
        response.writeHead(200)
        response.write(respUtil.responseData("success", "获取成功", data))
        response.end()
    })

}
path.set('getArticles', getArticles)
path.set('getCountByType', getCountByType)
path.set('getArticleById', getArticleById)
path.set('getAllId', getAllId)
module.exports.path = path