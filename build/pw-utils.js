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

  var entryJSContent = "\
import Vue from 'vue' \n\
import App from 'VUE_PATH' \n\
\n\
Vue.config.productionTip = false; \n\
\n\
new Vue({\n\
  el: '#app',\n\
  template: '<App/>',\n\
  components: { App }\n\
})\n\
";

  fs.removeSync('./' + _generate_entry);

  glob.sync(globPath).forEach(function(entry) {

    // TODO 代码还需要优化，主要是路径path

    var jsEntry = "./" + _generate_entry + "/" + path.dirname(entry).substring(11) +
                  (path.dirname(entry).substring(11) ? "/" : "" ) +
                  path.basename(entry, ".html.vue") + ".js";

    fs.ensureDirSync(path.dirname(jsEntry));
    var VUE_PATH = getUpDirStr(path.dirname(entry))
          + path.dirname(entry) + "/" +path.basename(entry, ".vue");
    fs.writeFileSync(jsEntry, entryJSContent.replace('VUE_PATH', VUE_PATH), {}, showError);

    var entryName = path.dirname(entry).substring(11) +
            (path.dirname(entry).substring(11) ? "/" : "" ) + path.basename(entry, ".vue");
    entries[entryName] = jsEntry;
  });

  return  JSON.parse(JSON.stringify(entries));
}

exports.getHtmlWebpackPlugin = function() {

  var list = [];
  for(var key in entries){
    list.push(new HtmlWebpackPlugin({ // https://github.com/ampedandwired/html-webpack-plugin
      filename: key,
      template: './src/layout/default.html', // TODO 还没有支持配置layout的方式
      chunks: [key],
      inject: true
    }))
  }

  return list;
}
