# pw-vue-multi-page

> A better vue multi-page project demo.

这是一个非常简单的vue webpack多页面项目模板。

只要往`src/html`目录中增加以`.html.vue`结尾的文件，即可渲染为路径一致的页面。

1. 开发运行：`npm install && npm run dev`

2. 生成静态文件：`npm run build`

    生成静态文件，同时生成项目分析报告页：`npm run build --report`

## 1. 关于该项目的由来

该项目修改自vue官方脚手架`vue init webpack`生成的基本webpack项目，但是没有用到`vue-router,ESLint,Unit tests,e2e tests`的基本项目模板。

通过比对这个基本项目和pw-vue-multi-page项目模板，即可知道修改的地方。


## 2. 关于引入vue组件库

模板分别引入了element-ui和we-vue两个vue UI组件库作为示例，分别在`element`和`we-vue`分支中。可以切换分支查看。

