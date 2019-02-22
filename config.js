let fs = require('fs')
let globalConfig = {}
let confs = fs.readFileSync('./server.conf').toString().split('\r\n')

for(let i = 0; i < confs.length; i++){
    globalConfig[confs[i].split('=')[0]] = confs[i].split('=')[1]
}

module.exports = globalConfig