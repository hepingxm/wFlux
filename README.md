## 微信小程序状态管理工具,wFlux
#### 1. 在小程序入口文件app.js中引入wFlux，
```
    import WFlux from './wFlux/core.js'

    new WFlux({
            todoTxt: "状态数据"
    })
```
todoTxt为状态数据，你可以将需要进行状态管理的数据写在这里就可以了，全局只需要一个实例；
#### 2.在你需要状态管理的Page,或者是Component中
```
import commit from './wFlux/commit.js'

Page({
    fluxData: ['todoTxt'],
    watch: {
        todoTxt(newVal,oldVal){
            console.log("数据监听",newVal,oldVal)
        }
    },
    onLoad(){
       commit('todoTxt',"状态数据被修改")
    }
})

// or

Component({
    fluxData: ['todoTxt'],
    ready(){
        commit('todoTxt',"状态数据被修改")
    }
})

// 如下是页面 xx.wxml
<text>{{todoTxt}}</text>
```
fluxData: 注册全局状态数据
watch : 监听data/fluxData的数据
------todoTxt: 监听fluxData.todoTxt

如有疑问联系qq:1375147062
