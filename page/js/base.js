const tag = new Vue({
    el: '#tag',
    data: {
        tagList: []
    },
    methods: {
        getTags: function () {
            axios.get('/getTags').then((resp) => {
                let data = resp.data.data
                let dataArr = []
                for (let i = 0; i < data.length; i++) {
                    let temp = data[i].tag
                    if (!dataArr.includes(temp)) {
                        let r = Math.random() * 255
                        dataArr.push(temp)
                    }
                }
                let arr = []
                for (let i = 0; i < dataArr.length; i++) {
                    arr.push({
                        tag: dataArr[i],
                        style: 'color:rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ');border:1px solid rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'
                    })

                }
                this.tagList = arr
            }).catch((error) => {

            })
        }
    },
    created: function () {
        this.getTags()
    }
})

