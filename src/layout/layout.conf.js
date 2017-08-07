/**
 * 不同页面使用不同的layout配置：配置项为{路径regex: 匹配的js和html的路径（数组或字符串，以后缀标识）}
 * - 默认的模版文件是default.html，默认的entry文件是entry.js
 * - 路径的目录前缀是 ./src/html/，使用正则表达式
 * - 模版和entry文件，以后缀来区分，html是模版文件，.js是entry文件。
 * - 模版和entry文件的值接口字符串或字符串数组，当文件没提供时，则使用默认文件
 */

module.exports = {
   //'\./src/html/m/.*': ['./entry.js', './default.html'] // 示例指定某个目录使用某个entry.js
}
