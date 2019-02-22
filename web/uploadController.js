let path = new Map()
let writeBlogDao = require('../dao/writeBolgDao')
let dateUtil = require('../utils/dateUtil')
let resp = require('../utils/resp')
function upload(request, response) {
  request.on('data', (data) => {
    let temp = JSON.parse(data.toString())
    console.log(temp)
    writeBlogDao.insertBlog(temp.type, temp.title, temp.tags, temp.content, temp.hasread,temp.hasdo, temp.commentCount,dateUtil.dateUtil(), dateUtil.dateUtil(), (data) => {
        response.writeHead(200)
        response.write(resp.responseData('success','添加成功',null))
        response.end()
        let blog_id = data.insertId
        let tags = temp.tags.split(',')
        for(let i = 0 ; i < tags.length; i++){
          writeBlogDao.insertTags(parseInt(blog_id),tags[i],dateUtil.dateUtil())
        }
    })
  })



}

path.set('upload', upload)
module.exports.path = path