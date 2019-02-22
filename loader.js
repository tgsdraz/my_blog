let fs = require('fs')
let globalConfig = require('./config')
let pathMap = new Map()

let files = fs.readdirSync('./web')

for(let i = 0; i < files.length; i++){
    
    let temp = require('./'+globalConfig['web_path']+files[i])
    if(temp.path){
        for(let [k,v] of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k,v)
            }else{
                throw new Error('已存在')
            }
        }
    }

}

module.exports = pathMap