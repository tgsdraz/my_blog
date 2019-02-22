// let imgName = document.getElementById('img').files[0].name
// let formdata = new FormData()
// let fileInput = document.querySelector('.input-file');
document.getElementById('btn1').onclick = function () {

    // let files = fileInput.files
    // console.log(fileInput)
    // if (files.length > 0) {
    //     [].slice.call(files).forEach(function (value, index) {
    //         console.log(value, index)
    //         formdata.append('img' + index, value, value.name) //遍历添加数据
    //     })
    // } else {
    //     alert('请先选择图片');
    //     return false;
    // }
    let type = $('#type').val();
    let title = $('#title').val();
    let tags = $('#tags').val()
    tags = tags.trim().replace('，', ',')

    let content = $('#editor').html().trim()
    let data1 = JSON.stringify({
        type: type,
        title: title,
        tags: tags,
        content: content,
        hasread:0,
        hasdo:0,
        commentCount:0,
        
    })
    // for (let prop in data1) {
    //     if (!data1[prop]) {
    //         alert('数据不能为空')
    //         return
    //     }
    // }
    $.ajax({
        url: '/upload',
        type: 'post',
        data: data1,
        success: (data) => {
            let data1 = JSON.parse(data)
            if (data1.status == 'success') {
                alert('添加成功')
                $('#title').val('')
                $('#tags').val('')
                $('#editor').html('')
            } else {
                alert('添加失败')
            }
        }
    })
}