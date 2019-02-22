let path = new Map()
let regDao = require('../dao/regDao')
let regUserUtil = require('../utils/regUserUtil')
let dateUtil = require('../utils/dateUtil')
let resp1 = require('../utils/resp')
function regeditUser(request,response){
    request.on('data',(data) => {
        let dataArr = regUserUtil.regUserData(data.toString())
        regDao.insertRegUser(dataArr[0],dataArr[1],dateUtil.dateUtil(),(resp) => {
            console.log(resp)
            response.writeHead(200)
            response.write(resp1.responseData(200,'添加成功',null))
            response.end()
        })

    })
}

path.set('regeditUser',regeditUser)

module.exports.path = path