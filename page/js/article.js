let blogArticle = new Vue({
    el: '#blogArticle',
    data: {
        title: '',
        hasRead: 0,
        hasDo: 0,
        commentCount: 0,
        content: '',
        tags: '',
        ctime: '',
        id: 0,
        idArray:[],
        currentIndex:0,
        comments:[],
        commentId:0,
        commentName:''
    },
    computed: {
        
    },
    methods: {
        reply: function (commentId, commentName) {
            this.commentId = commentId
            this.commentName = commentName
            console.log(commentName)
            location.href = '#store-comment'
        },
        doClick: function (id) {
            if (JSON.parse(localStorage.getItem(id)) == id) {
                alert('已经点赞')
            } else {
                this.hasDo++
                axios.post('/updateBlogDo', JSON.stringify({
                    id: id,
                    hasDo: this.hasDo
                })).then((resp) => {
                    localStorage.setItem(id, id)
                    alert('感谢支持')
                }).catch()
            }

        },
        getBlogArticle: function () {
            let blogSearchUrl = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : ''
            if (blogSearchUrl == "") {
                return
            }
            let id = blogSearchUrl.split('=')[1]
            this.id = id
            this.getAllArticleId()
            this.getAllComments(id)
            this.getCommentCount(id)
            axios.get('/getBlogArticle?id=' + id).then((resp) => {
                let data = resp.data.data[0]
                this.ctime = convertDate(data.ctime)
                this.title = data.title
                this.hasRead = data.has_read
                this.hasDo = data.has_do
                this.content = data.content
                this.tags = data.tags.split(',')
                axios.post('/updateRead', JSON.stringify({
                    id: id,
                    hasRead: this.hasRead + 1
                })).then((resp) => {

                })
            }).catch((error) => {

            })
        },
        getAllArticleId(){
            axios.get('/getAllId').then((resp) => {
                let data = resp.data.data
                let idArr = []
                for(let i = 0; i < data.length; i++){
                    idArr.push(data[i].id)
                    if(this.id == data[i].id){
                        this.currentIndex = i
                    }
                }
                this.idArray = idArr
            }).catch((error) => {

            })
        },
        prev:function(){
            if(this.currentIndex <= 0) {
                alert('已到第一篇文章')
                return
            }
            location = '/article.html?id='+this.idArray[this.currentIndex - 1]
        },
        next:function(){
            if(this.currentIndex >= this.idArray.length - 1) {
                alert('已到最后一篇文章')
                return
            }
            location = '/article.html?id='+this.idArray[this.currentIndex + 1]
        },
        store:function(id){
            
            let comment = $('#comment').val()
            let name = $('#aliseName').val()
            let comments = {}
            if (!this.commentId && !this.commentName) {
                comments = {
                    comment: comment,
                    name: name,
                    id: id,
                    parent:0,
                    parentName:''
                }
            } else {
                comments = {
                    comment: comment,
                    name: name,
                    id: id,
                    parent:this.commentId,
                    parentName:this.commentName
                }
            }
            axios.post('/insertComments',comments).then((resp) => {
                if(resp.status == 200){
                    alert('留言成功')
                    $('#comment').val("")
                    $('#aliseName').val("")
                }
                this.getAllComments(id)
            }).catch((error) => {

            })
        },
        getAllComments:function(id){
            axios.get('/getComments?id='+id).then((resp) => {
                let comments = resp.data.data
                for(let i = 0; i < comments.length; i++){
                    comments[i].ctime = convertTime(comments[i].ctime)
                    if(comments[i].parent > 0){
                        comments[i].replys = comments[i].alise + '回复@' + comments[i].parent_name
                    }
                }
                this.comments = comments
                console.log(this.comments)
            }).catch((error) => {

            })
        },
        getCommentCount:function(id){
            axios.get('/getCommentsCount?id='+id).then((resp) => {
                this.commentCount = resp.data.data[0].count
                console.log(this.commentCount)
            })
        }
    },
    created: function () {
        this.getBlogArticle()
    }
})