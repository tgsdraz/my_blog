function regUserData(data){
    let dataArr = data.split('&')
    let dataArray = []
    for(let i = 0; i < dataArr.length; i++){
        let temp = dataArr[i]
        dataArray.push(temp.split('=')[1])
    }
    return dataArray
}

module.exports.regUserData = regUserData