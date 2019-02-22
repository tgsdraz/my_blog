let daoUtil = require('./daoUtil')

function adminLogin(adminName,adminPwd,success){
    let params = [adminName,adminPwd]
    let querySql = `select * from admin where admin_name=? and admin_pwd=?`
    let connecion = daoUtil.createConnection()
    connecion.connect()
    connecion.query(querySql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error)
        }
    })
    connecion.end()
}

module.exports.adminLogin = adminLogin