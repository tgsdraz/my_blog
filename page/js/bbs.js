const bbs = new Vue({
    el: '#bbs',
    data: {
        comments: [],
        commentId: 0,
        commentName: '',
    },
    methods: {
        reply: function (commentId, commentName) {
            this.commentId = commentId
            this.commentName = commentName
            console.log(commentName)
            location.href = '#send-comment'
        },
        store: function () {
            let comment = $('#comment').val()
            let name = $('#aliseName').val()
            let comments = {}
            if (!this.commentId && !this.commentName) {
                comments = {
                    comment: comment,
                    name: name,
                    id: 0,
                    parent:0,
                    parentName:''
                }
            } else {
                comments = {
                    comment: comment,
                    name: name,
                    id: 0,
                    parent:this.commentId,
                    parentName:this.commentName
                }
            }
            console.log(comments)
            axios.post('/insertComments', comments).then((resp) => {
                if (resp.status == 200) {
                    alert('留言成功')
                    $('#comment').val("")
                    $('#aliseName').val("")
                    this.getAllComments()
                }
            }).catch((error) => {

            })
        },
        getAllComments: function () {
            axios.get('/getComments?id=0').then((resp) => {
                let comments = resp.data.data
                for (let i = 0; i < comments.length; i++) {
                    comments[i].ctime = convertTime(comments[i].ctime)
                    if(comments[i].parent > 0){
                        comments[i].replys = comments[i].alise + '回复@' + comments[i].parent_name
                    }
                }
                this.comments = comments
                console.log(this.comments)
            }).catch((error) => {

            })
        }

    },
    created: function () {
        this.getAllComments()
    }
})