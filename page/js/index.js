var articleType = new Vue({
    el: '#articleType',
    data: {
        types: [
            {type:1,text:'前端'},
            {type:2,text:'javascript'},
            {type:3,text:'css'},
            {type:4,text:'vue'},
            {type:5,text:'正则'},
        ],
        page1:1,
        pageSize1:5
    },
    methods: {
        getArticles: function (type,page,pageSize) {
            axios.get('/getArticles?type='+type+'&page='+page+'&pageSize='+pageSize,).then((resp) => {
                let data = resp.data.data
                for (let i = 0; i < data.length; i++) {
                    switch (data[i].type) {
                        case 1:
                            data[i].type = '前端'
                            break;
                        case 2:
                            data[i].type = 'javascript'
                            break;
                        case 3:
                            data[i].type = 'css'
                            break;
                        case 4:
                            data[i].type = 'vue'
                            break;
                        case 5:
                            data[i].type = '正则'
                            break;
                    }
                }
                for (let i = 0; i < data.length; i++) {
                    let temp = new Date(data[i].ctime * 1000)
                    let year = temp.getFullYear()
                    let month = temp.getMonth() + 1
                    let day = temp.getDate()
                    month = month < 10 ? '0' + month : month
                    day = day < 10 ? '0' + day : day
                    data[i].ctime = year + '-' + month + '-' + day
                }
                article.articleList = data
                this.getCount(type)
            }).catch((error) => {
                console.log(error)
            })
        },
        getCount: function (type) {
            axios.get('/getCountByType?type='+type).then((resp) => {
                let count = resp.data.data[0].count
                console.log(count)
                let pages = Math.ceil(count / article.pageSize)
                article.orders = []
                for (let i = 1; i <= pages; i++) {
                    article.orders.push({
                        text: i,
                        type:type
                    })
                }
                console.log(article.orders)
            }).catch((error) => {

            })
        },

    }
})


var article = new Vue({
    el: '#articleList',
    data: {
        articleList: [],
        page: 1,
        pageSize: 5,
        count: 0,
        orders: [],
        tagList: []
    },
    methods: {
        getAll: function () {

            axios.get('/getAll?page=' + this.page + '&pageSize=' + this.pageSize).then((res) => {
                let data = res.data.data

                for (let i = 0; i < data.length; i++) {
                    switch (data[i].type) {
                        case 1:
                            data[i].type = '前端'
                            break;
                        case 2:
                            data[i].type = 'javascript'
                            break;
                        case 3:
                            data[i].type = 'css'
                            break;
                        case 4:
                            data[i].type = 'vue'
                            break;
                        case 5:
                            data[i].type = '正则'
                            break;
                    }
                }
                for (let i = 0; i < data.length; i++) {
                    let temp = new Date(data[i].ctime * 1000)
                    let year = temp.getFullYear()
                    let month = temp.getMonth() + 1
                    let day = temp.getDate()
                    month = month < 10 ? '0' + month : month
                    day = day < 10 ? '0' + day : day
                    data[i].ctime = year + '-' + month + '-' + day
                    data[i].link = '/article.html?id='+data[i].id
                }
               
                this.articleList = data
                
                console.log(this.articleList)
            }).catch((error) => {
                console.log(error)
            })


        },
        getCount: function () {
            axios.get('/getCount').then((resp) => {
                let count = resp.data.data[0].count
                this.count = count
                let pages = Math.ceil(count / this.pageSize)
                for (let i = 1; i <= pages; i++) {
                    this.orders.push({
                        text: i
                    })
                }
            }).catch((error) => {

            })
        },
        getData: function (page,type,pageSize) {
            this.page = page
            if(type){
                articleType.getArticles(type,page,pageSize)
            } else {
                this.getAll()
            }
            
        },
        getAllArticle:function(id){
            for(let i = 0; i < this.articleList.length; i++){
                if(id == this.articleList[i].id){
                    console.log(this.articleList[i])
                }
            }
            window.location = '/article.html?id='+id
        }
    },
    created: function () {
        this.getAll()
        this.getCount()
    }
})

