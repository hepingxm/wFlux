import observe from './observe.js'

/**
 * 数据监听，支持page/component中的data，fluxData中定义的数据的监听
 * @param that
 * @param fluxData
 */
module.exports = (that,fluxData)=>{
    let WATCH = "watch"
    if(that[WATCH]){
        let watchObj = that[WATCH]
        for(let key in watchObj){
            if(that.data[key]){
                observe(that.data,key,(newVal,oldVal)=> {
                    watchObj[key].call(that,newVal,oldVal)
                })
            }
            if(fluxData[key]){
                observe(fluxData,key,(newVal,oldVal)=> {
                    watchObj[key].call(that,newVal,oldVal)
                })
            }
        }
    }
}
