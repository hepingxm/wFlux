import isArray from './util/is.js'
import isObject from './util/is.js'

function observeCell(obj,key,callBack){
    let val = obj[key]
    if(isObject(val) || isArray(val)){
        observe(val)
    }
    Object.defineProperty(obj,key,{
        enumerable: true,
        get(){
            return val
        },
        set(newVal){
            if(newVal === val) return
            callBack(newVal,val)
            if(isObject(val) || isArray(val)){
                observe(newVal)
            }
        }
    })
}

/**
 * 数据劫持
 * @param obj
 * @returns {*}
 */
module.exports = function(obj,defaultKey,callBack) {
    if(defaultKey){
        observeCell(obj,defaultKey,function (newVal,oldVal) {
            callBack(newVal,oldVal)
        })
    }else {
        for(let key in obj){
            observeCell(obj,key,function (newVal,oldVal) {
                callBack(newVal,oldVal)
            })
        }
    }
}
