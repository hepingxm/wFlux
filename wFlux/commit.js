/**
 * 提交数据
 * @param dataName
 * @param data
 */
module.exports = (dataName,data)=>{
    // 遍历订阅者，并更新数据
    if(!global._componentInstance) return
    global._componentInstance.forEach((item,index)=> {
        if(item['fluxData']){
            item.setData({
                [`${dataName}`]: data
            })
        }
    })
}
