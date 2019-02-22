let url = require('url')
let paramsData = {}
function paramsByMethod(request){
    console.log(request.method)
    if(request.method == 'GET'){
        let params = url.parse(request.url,true).query
        paramsData = params
    } else {
        request.on('data',(data) => {
            let temp = data.toString().split('&')
            for(let i = 0; i < temp.length; i++){
                let tempParam = temp[i].split('=')
                paramsData[tempParam[0]] = tempParam[1]
            }
        })
    }
    // console.log(paramsData)
    return paramsData
}
module.exports.paramsByMethod = paramsByMethod