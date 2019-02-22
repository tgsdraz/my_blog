let path = new Map()
let url = require('url')
let loginDao = require('../dao/loginDao')
let regUserUtil = require('../utils/regUserUtil')
let dateUtil = require('../utils/dateUtil')
let resp1 = require('../utils/resp')

function login(request, response) {
    let params = url.parse(request.url, true).query

    
    loginDao.queryPwdByUsername(params.username, (resp) => {
        if (resp.length > 0) {
            response.writeHead(200)
            response.write(resp1.responseData(200, '登录成功', resp))
            response.end()
        } else {
            response.writeHead(200)
            response.write(resp1.responseData(200, '登录失败', resp))
            response.end()
        }

    })

}

path.set('login', login)

module.exports.path = path