
$('.btn').on('click',() => {
    let adminName = $('#adminName').val()
    let adminPwd = $('#adminPwd').val()
    $.ajax({
        url:'/adminLogin?adminName='+adminName+'&adminPwd='+adminPwd,
        method:'get',
        success:(result) => {
            let res = JSON.parse(result)
            if(res.data.length > 0) {
                alert(res.msg)
                window.location = '/writeBlog.html'
            } else {
                alert(res.msg)
                $('#adminName').val('')
                $('#adminPwd').val('')
            }
        },
        fail:(result) => {
            console.log(result)
        }

    })
})