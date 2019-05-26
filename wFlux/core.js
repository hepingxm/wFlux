/**
 * 复杂组件存在多层嵌套的情况，跨组件，跨页面之间的数据流依靠层层事件传递的方式；
 小程序官方并未提供状态管理；所以自己实现了一个；以下是参考实现代码
 * @type {WFlux}
 * @author hp
 * @wechat hp96358
 * @date {2019/5/26}
 */
import watch from './watch.js'

module.exports = class WFlux{
    constructor(fluxData){
        this.nativePage = Page
        this.nativeComponent = Component
        this.FLUXDATA = 'fluxData'
        this.data = fluxData
        this.init()
    }
    init(){
        Page = (options)=> {
            let that = this
            this.load(options,['onLoad','onUnload'],true,{
                onLoad: function () {
                    that.cacheComponentInstance(this)
                },
                onUnload: function () {
                    that.rmComponentInstance(this)
                }
            })
        }
        Component = (options)=> {
            let that = this
            this.load(options,['attached','detached'],false,{
                attached: function () {
                    that.cacheComponentInstance(this)
                },
                detached: function () {
                    that.rmComponentInstance(this)
                }
            })
        }
    }
    load(options,methods,isPage = true, callBackObject){
        const nativeLoad = []
        methods.forEach((method,index) => {
            nativeLoad.push(options[method])
            options[method] = function () {
                callBackObject[method] && callBackObject[method].apply(this,arguments);
                nativeLoad[index] && nativeLoad[index].apply(this, arguments);
            }
        })
        isPage ? this.nativePage(options): this.nativeComponent(options)
    }
    cacheComponentInstance(that){
        if(!global._componentInstance){
            global._componentInstance = []
        }
        this.checkData(that)
        this.setData(that)
        watch(that,this.data)
        global._componentInstance.push(that)
    }
    rmComponentInstance(that){
        for(let i=0;i<global._componentInstance.length;i++){
            if(that === global._componentInstance[i]){
                global._componentInstance.slice(1,i)
                break
            }
        }
    }
    checkData(that){
        if(!that.data) return
        if(!that[this.FLUXDATA]) return
        for(let index in that[this.FLUXDATA]){
            for(let dIndex in that.data){
                if(that[this.FLUXDATA][index].split(".")[0] == dIndex){
                    throw new Error("fluxData与data不能重名")
                }
            }
        }
    }
    /**
     * 设置数据
     * @param that
     */
    setData(that){
        if(!that[this.FLUXDATA]) return
        let observefluxArray = that[this.FLUXDATA]
        observefluxArray.forEach((item,index)=> {
            that.setData({
                [`${item}`]: this.data[`${item}`]
            })
        })
    }
}

