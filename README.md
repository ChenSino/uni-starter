## 什么是 uniCloud

uniCloud 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的云开发平台，更多请参考[uniCloud 文档](https://uniapp.dcloud.io/uniCloud)。

## 云端一体搜索模板解决了什么问题？

uniCloud 云端一体搜索模板，自带下拉候选、历史搜索、热搜。无需再开发服务器代码

云端一体搜索模板有以下功能点：

- 热词设置，可自定义，回车默认搜索热词
- 搜索历史，本地历史，去重排序删除
- 搜索记录，自动向云端储存搜索记录，可用于归纳搜索发现
- 搜索发现，向用户展现热搜
- 搜索联想，基于 uni-list 实现搜索联想列表，兼容 nvue，高性能
- APP 端语音输入，解放双手
- 兼容 nvue

前后一体，兼容 nvue，只需导入插件，初始化数据库即可拥有上述功能。

您也可以自己修改逻辑自定义数据库字段，和随意定制 UI 样式。

## 体验步骤

1. 下载或导入示例项目，绑定一个 uniCloud 服务空间。需 HBuilderX 3.0 以上版本。

2. 在项目的 uniCloud/database 目录下找到 db_init.json，对其点右键执行初始化数据库。这样会给服务空间创建 3 个表：opendb-search-log、opendb-search-hot、opendb-mall-goods。如果之前存在相同表，建议删除后重新执行数据库初始化。

3. 运行示例项目到任意平台，H5、App、小程序均可。

4. 运行后首页是商品列表，上面有搜索框。点击搜索框进入搜索页面，输入待搜索的商品名称会在下方拉出候选，确认搜索后会返回商品列表页面，列表内容即为搜索结果。

5. 在项目的 uniCloud/cloudfunctions 目录下找到云函数 uni-analyse-searchhot，点右键上传到服务空间，该云函数会定时运行，统计和计算近期热搜关键字，并体现在搜索界面的热搜候选词中。

## 项目代码说明

### uniCloud 数据表

数据表基于 [openDB](https://gitee.com/dcloud/opendb/tree/master) 规范，它约定了一个标准用户表的表名和字段定义，并且基于 nosql 的特性，可以由开发者自行扩展字段。

本项目用到了 3 个表：

- opendb-search-log：搜索日志表。每次搜索，都会将搜索词记录在该表中。[详见](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-search-log)
- opendb-search-hot：热搜表。通过其他云函数定期分析搜索日志表，提取近期热搜词，存入热搜表。[详见](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-search-hot)
- opendb-mall-goods：用于本示例演示的商品列表。实际项目中，可自行提供为需要搜索的表。[详见](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-mall-goods)

这些表在 uniCloud Web 控制台中新建表的界面，均可以选择。

### 云函数

- `uni-analyse-searchhot`
  > - 这是一个定时运行的跑批云函数。用于从搜索日志表中归纳热搜。默认归纳最近`7天`搜索记录，截取其中`10`条，可在云函数中进行修改
  > - 在`package.json`中有其触发器配置，默认`每2小时`运行一次，可在配置中修改。部署在云端后，也可以在 web 控制台修改。定时触发器使用[cron 表达式](https://uniapp.dcloud.net.cn/uniCloud/trigger)
  > - _`注意`_ 该云函数本地运行不生效，需要上传部署至云端

### 前端页面

首页是商品列表页面，点击顶部的搜索框，进入搜索页面。

前端页面基于 [unicloud-db](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db) 组件操作数据库。

商品列表页面是基于 [云端一体商品列表模板](https://ext.dcloud.net.cn/plugin?id=2651) 改进而来。

页面示例搜索的是“opendb-mall-goods”表，可以在页面中的clientDB组件中修改collection属性，指向新的数据表进行搜索。