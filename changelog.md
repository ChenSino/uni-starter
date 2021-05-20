## 1.0.5（2021-05-20）
改用uni_modules方式处理图片选择api时无权限，引导用户快捷打开系统设置
## 1.0.4（2021-05-19）
为方便部署，添加空的manifest.json uni-config-center下的uni-id配置
## 1.0.3（2021-05-18）
重大调整，原云函数名称：user-center改名叫uni-id-cf
修复，绑定手机号码场景。因手机未插SIM导致的一键登录失败后未直接跳到获取短信验证码方式绑定
## 1.0.2（2021-05-17）
添加 uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 文件
## 1.0.1（2021-05-17）
manifest.json 在小程序平台增加了一个配置项 betterScopedSlots，启用新的作用域插槽编译，用于支持作用域插槽内使用复杂表达式。
## 1.0.0（2021-05-17）
第一版