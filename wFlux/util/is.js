module.exports = function isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]'
}
module.exports = function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]'
}
module.exports = function isNull(data) {
    return Object.prototype.toString.call(data) === '[object Null]'
}
module.exports = function isUndefined(data) {
    return Object.prototype.toString.call(data) === '[object Undefined]'
}
