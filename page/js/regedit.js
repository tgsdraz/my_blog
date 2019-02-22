let regUser = /\w{6,10}/
let regPsd = /[a-zA-Z0-9]{6,10}/
$('.reg_btn').on('click',() => {
    let username = $('#username').val()
    let password = $('#password').val()
    console.log(username,password)
    
    if(regUser.test(username) && regPsd.test(password)){
        $.ajax({
            url:'/regedit_user',
            method:'post',
            data:{
                username:username,
                password:password
            },
            success:(result) => {
                alert(JSON.parse(result).msg)
                $('#username').val('')
                $('#password').val('')
    
            },
            fail:(error)=>{
                console.log(error)
            }
        })
    } else {
        alert('不符合条件,请重新输入')
        $('#username').val('')
        $('#password').val('')
    
    }
    
})