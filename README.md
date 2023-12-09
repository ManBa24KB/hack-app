# 2022.7.6 测试环境更新内容  
### 1、VC Watch 中Transfer Activity和Trading Activity两个模块内容更新。
### 2、Notable Entity Tracker和High-risk新增followed功能。
### 3、首页ui调整。
### 4、修复石墨反馈的问题。
### 5、每个页面都加了埋点（极光数据统计）
### 6、新增了login页面
### 7、白名单逻辑完成。

# 2022.7.8--测试环境更新内容有
### 1:白名单优化。
### 2:新增submit a tag 功能。
### 3:token大模块tab新增一个Token Holder Graph模块。
### 4:修复石墨反馈的问题。
### 5:修复Notable Entity Tracker和High-risk标签有特殊字符导致查询更多Recent transaction失败的问题。
### 6.新增搜索埋点功能。（通过接口的形式记录用户每次的搜索记录）
### 7.table中的地址跳转地址大模块时，提前调用一个接口判断是否是合约地址。（合约地址不进行跳转）

# 2022.7.15--测试环境更新内容有
### 1.VC Watch 中的Position Analysis 页面更新
### 2.修复登录失效，连接钱包状态没有变化。
### 3.修复大户和黑客查看更多第一次有loading效果，后面在查看时loading效果失效问题。
### 4.大户和黑客查看更多列表中的to和from属性也支持ens/tag跳转。
### 5.把连接钱包获取到的钱包账户地址统一都转成小写（后端登录接口只支持小写的地址）。

# 20022.7.18--测试环境更新内容有
### 1.修复一个用户钱包其中有一个钱包账户添加到白名单，导致钱包其他账户也授权成功了。
### 2.将Entity Analysis 中 Top Contract Interactions 改为 Most Interacted Contracts。
### 3.Address 头部样式调整，ens tags合并到Wallet Tags中。

# 2022.7.19--测试环境更新内容有
### 1.tab栏鼠标移入标题效果修改 文字不放大颜色改为选中颜色样式。
### 2.配置多环境打包。
### 3.头部搜索记录用户搜索行为（记录搜索哪些地址）。

# 2022.7.22--更新内容
### 1.token穿透图支持模糊搜索
### 2.极光数据统计关掉获取位置信息上报权限
### 3.图表中加了产品水印元素
### 4.Vc Watch中的Balance USD Value数据展示折现图用柱状图替换
### 5.地址穿透图详情Latest Transaction添加跳转etherscan功能
### 6.address 头部ens标签合并到Wallet Tags中
### 7.Vc Watch中的VC Holdings by Token标签把地址数显示出来

# 2022.7.25--更新内容
### 1.user中增加一个create alert模块。

# 2022.7.26--更新内容
### 1.更新token模糊搜索交互。

# 2022.8.3--更新内容
### 1.vc watch 拆分成单个VC数据集合（新增position 和 Latest Transactions模块）。
### 2.地址穿透图去掉了nft，tokenContract标签类型。
### 3.地址信息wallet overview中添加了Latest Transactions模块。

# 2022.8.22--更新内容
### 1.在user中新增create alerts功能。
### 2.在user中新增create entity功能。
### 3.在menu中新增了entity dashboard大模块功能。
### 4.在header添加了一个会员介绍页面。

# 2022.8.24--更新内容
### 1.entity name and alert name 输入框特殊字符处理
### 2.address穿透图去掉special-eoa类型
### 3.address详情中ens标签显示处理
### 4.前端页面整体优化处理