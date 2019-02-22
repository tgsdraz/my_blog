let path = new Map()
let updateDao = require('../dao/updateDao')
let resp = require('../utils/resp')
function updateBlogDo(request, response) {
  request.on('data', (data) => {
    let temp = JSON.parse(data.toString())
    console.log(temp)
    updateDao.updateDo(temp.id,temp.hasDo, (data) => {
        response.writeHead(200)
        response.write(resp.responseData('success','添加成功',null))
        response.end()
    })
  })
}
function updateBlogRead(request, response) {
    request.on('data', (data) => {
      let temp = JSON.parse(data.toString())
      console.log(temp)
      updateDao.updateRead(temp.id,temp.hasRead, (data) => {
          response.writeHead(200)
          response.write(resp.responseData('success','更新成功',null))
          response.end()
      })
    })
  }
path.set('updateBlogDo', updateBlogDo)
path.set('updateBlogRead', updateBlogRead)
module.exports.path = path