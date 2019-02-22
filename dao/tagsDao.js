let daoUtil = require('./daoUtil')

function getTags(success){
    let querySql = `select tag from tags`
    let params = []
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
module.exports.getTags = getTags