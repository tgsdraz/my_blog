let url = require('url')
let adminDao = require('../dao/adminDao')
let resp = require('../utils/resp')
let path = new Map()
function adminLogin(request,response){
    let params = url.parse(request.url,true).query
    adminDao.adminLogin(params.adminName,params.adminPwd,(result) => {
        if(result.length > 0){
            response.writeHead(200)
            response.write(resp.responseData(200,'登录成功',result))
            response.end()
        } else {
            response.writeHead(200)
            response.write(resp.responseData(200,'登录失败',result))
            response.end()
        }
    })
}

path.set('adminLogin',adminLogin)

module.exports.path = path