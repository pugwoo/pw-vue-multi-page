/**
 * Created by Pugwoo on 2017/4/8.
 */

var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function showError(error) {
  console.error(error);
}

function getUpDirStr(dir) { // dir需要以./src/html开头
  var count = (dir.match(/\//g) || []).length;
  var str = "";
  for(var i = 0; i < count - 1; i++) {
    str += "../";
  }
  return str;
}

var entries = {};

exports.getEntries = function (globPath) {

  var _generate_entry = "_generate_entry";

  var entryJSContent = fs.readFileSync('./src/layout/entry.js','utf8');

  fs.removeSync('./' + _generate_entry);

  glob.sync(globPath).forEach(function(entry) {

    // 获取生成js入口文件
    var reg = /([^\/]*\/){3}/;
    var pathEntry = path.dirname(entry).replace(reg,"");

    if(pathEntry.startsWith("./src/")) { // ./src/开头仅出现在src/html目录下第一级目录下的文件
        pathEntry='';
    }

    var jsEntry = "./" + _generate_entry + "/" + pathEntry + (pathEntry ? "/" : "" )
                  + path.basename(entry, ".html.vue") + ".js";

    //创建文件、目录
    fs.ensureDirSync(path.dirname(jsEntry));
    var VUE_PATH = getUpDirStr(path.dirname(entry)) + path.dirname(entry)
                   + "/" +path.basename(entry, ".vue");
    //同步版的fs.writeFile() 将entryJSContent写入js入口文件
    fs.writeFileSync(jsEntry, entryJSContent.replace('__VUE_PATH__', VUE_PATH), {}, showError);

    //获取入口名称
    var entryName = pathEntry + (pathEntry ? "/" : "" ) + path.basename(entry, ".vue");
    //生成正确的html和js路径
    entries[entryName] = jsEntry;
  });

  return  JSON.parse(JSON.stringify(entries));
}

exports.getHtmlWebpackPlugin = function() {

  var list = [];
  for(var key in entries){
    list.push(new HtmlWebpackPlugin({ // https://github.com/ampedandwired/html-webpack-plugin
      filename: key,
      template: './src/layout/default.html', // 目前所有entry共用一个layout，可以按需修改
      chunks: [key, 'vendor', 'manifest'], // 每个html引用的js模块
      inject: true
    }))
  }

  return list;
}

exports.getHtmlWebpackPluginProd = function() {

  var list = [];
  for(var key in entries){
    list.push(new HtmlWebpackPlugin({ // https://github.com/ampedandwired/html-webpack-plugin
      filename: key,
      template: './src/layout/default.html', // 目前所有entry共用一个layout，可以按需修改
      chunks: [key, 'vendor', 'manifest'], // 每个html引用的js模块
      inject: true,
      minify: {
        removeComments: true,//去掉注释
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去换行
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }))
  }
  return list;
}

exports.chunks = function(){
  var chunks = Object.keys(entries);
  return chunks;
}
