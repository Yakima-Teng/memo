const path = require('path')

const join = (targetPath) => path.join(__dirname, '..', targetPath)

const getHashDate = () => {
    const date = new Date()
    const toDouble = (val) => parseInt(val) < 10 ? '0' + val : '' + val
    return `${date.getFullYear()}${toDouble(date.getMonth() + 1)}${toDouble(date.getDate())}${toDouble(date.getHours())}${toDouble(date.getMinutes())}`
}

const getHashDateStr = () => {
    const date = new Date()
    const toDouble = (val) => parseInt(val) < 10 ? '0' + val : '' + val
    return `${date.getFullYear()}年${toDouble(date.getMonth() + 1)}月${toDouble(date.getDate())}日${toDouble(date.getHours())}时${toDouble(date.getMinutes())}分`
}

module.exports = {
    join,
    getHashDate,
    getHashDateStr,
}
