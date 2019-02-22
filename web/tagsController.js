let tagsDao = require('../dao/tagsDao')
let path = new Map()
let respUtil = require('../utils/resp')

function getTags(request,response){
    tagsDao.getTags((data) => {
        response.writeHead(200)
        response.write(respUtil.responseData('success','获取成功',data))
        response.end()
    })
}
path.set('getTags',getTags)

module.exports.path = path