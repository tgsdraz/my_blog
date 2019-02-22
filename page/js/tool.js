function convertDate(date){
        let temp = new Date(date * 1000)
        let year = temp.getFullYear()
        let month = temp.getMonth() + 1
        let day = temp.getDate()
        let ctime = ''
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        ctime = year + '-' + month + '-' + day

        return ctime;

}
function convertTime(time) {
        let temp= new Date(time * 1000)
        let year = temp.getFullYear()
        let month = temp.getMonth() + 1
        let day = temp.getDate()
        let hour = temp.getHours()
        let min = temp.getMinutes()
        let sec = temp.getSeconds()
        let ctime = ''
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        ctime = year + '-' + month + '-' + day +' ' +hour+':'+min+':'+sec

        return ctime;
}