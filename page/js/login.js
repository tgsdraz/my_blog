$('.reg_btn').on('click',() => {
    let username = $('#username').val()
    console.log(username)
        $.ajax({
            url:'/login?username='+username,
            method:'get',
            success:(result) => {
                console.log(result)
                alert(JSON.parse(result).msg)
                $('#username').val('')
                $('#password').val('')
                window.location = '/index.html'
            },
            fail:(error)=>{
                console.log(error)
            }
        })
    
})