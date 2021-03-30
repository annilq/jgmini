# Remax Wechat With TypeScript

移动端入口分为三个
### 1.审批入口
http://localhost:8000/approvepage?bizId=1&id=2&formCode=3&type=4&flag=5&taskDetailId=6
路径:/approvepage
查询参数(以下参数列表数据均有提供)
{bizId, id, formCode, type, flag}
### 2.发起入口
http://localhost:8000/editpage/432971579142615040?path=usercreate/evec$405070783228256256&
路径:/editpage/:id?
查询参数
{path:"由菜单配置"}
### 3.详情入口
http://localhost:8000/detailpage/432971579142615040?path=usercreate/evec$405070783228256256&
路径:/editpage/:id
查询参数
{path:"由菜单配置"}

所有入口均要加token参数到查询字符串后面

