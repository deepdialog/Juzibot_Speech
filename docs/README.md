## Functions

<dl>
<dt><a href="#onScan">onScan(qrcode, status)</a></dt>
<dd><p>扫码事件</p>
</dd>
<dt><a href="#onLogin">onLogin(user)</a></dt>
<dd><p>登录成功事件</p>
</dd>
<dt><a href="#onLogout">onLogout(user)</a></dt>
<dd><p>退出登录事件</p>
</dd>
<dt><a href="#onMessage">onMessage(msg)</a></dt>
<dd><p>消息处理事件</p>
</dd>
<dt><a href="#onFriendship">onFriendship(friendship)</a></dt>
<dd><p>处理好友请求相关事件</p>
</dd>
<dt><a href="#intentDetect">intentDetect(msg)</a> ⇒</dt>
<dd><p>消息意图识别，识别后的意图会提交给policy</p>
</dd>
<dt><a href="#msgIntentDetect">msgIntentDetect(msg, payload)</a> ⇒</dt>
<dd><p>处理不同的message类型</p>
</dd>
<dt><a href="#textIntentDetect">textIntentDetect(msg, payload)</a> ⇒</dt>
<dd><p>文本意图的识别</p>
</dd>
<dt><a href="#removeIntent">removeIntent(_id)</a></dt>
<dd><p>删除一个id</p>
</dd>
<dt><a href="#listIntent">listIntent(belong)</a></dt>
<dd><p>列出intent</p>
</dd>
<dt><a href="#addIntentVector">addIntentVector(_id, intent, text, vector, belong)</a> ⇒</dt>
<dd><p>添加一个文本向量意图</p>
</dd>
<dt><a href="#loadExistsIntent">loadExistsIntent()</a></dt>
<dd><p>读取已经存在的一些写死的意图</p>
</dd>
<dt><a href="#queryIntent">queryIntent(text, belong, threshold, k)</a> ⇒</dt>
<dd><p>查询一个意图，先把文本转换为向量，然后调用opensearch进行knn查找</p>
</dd>
<dt><a href="#policy">policy(msg, intent)</a></dt>
<dd><p>处理意图，根据意图去调用actions</p>
</dd>
</dl>

<a name="onScan"></a>

## onScan(qrcode, status)
扫码事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| qrcode | <code>\*</code> | 二维码信息 |
| status | <code>\*</code> | 状态 |

<a name="onLogin"></a>

## onLogin(user)
登录成功事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>\*</code> | 登录用户 |

<a name="onLogout"></a>

## onLogout(user)
退出登录事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>\*</code> | 退出登录的用户 |

<a name="onMessage"></a>

## onMessage(msg)
消息处理事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |

<a name="onFriendship"></a>

## onFriendship(friendship)
处理好友请求相关事件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| friendship | <code>\*</code> | 好友请求信息 |

<a name="intentDetect"></a>

## intentDetect(msg) ⇒
消息意图识别，识别后的意图会提交给policy

**Kind**: global function  
**Returns**: 意图
file: 文件保存意图
url: 链接意图
search-file
get-search-file
remove-search-file
list-file
get-file
remove-file
list-todo
add-todo
mark-todo
greet : 介绍自己
bye : 再见  

| Param | Description |
| --- | --- |
| msg | 消息 |

<a name="msgIntentDetect"></a>

## msgIntentDetect(msg, payload) ⇒
处理不同的message类型

**Kind**: global function  
**Returns**: 一个包含意图的结构体  

| Param | Description |
| --- | --- |
| msg | 消息 |
| payload | 一些上下文 |

<a name="textIntentDetect"></a>

## textIntentDetect(msg, payload) ⇒
文本意图的识别

**Kind**: global function  
**Returns**: 意图  

| Param | Description |
| --- | --- |
| msg | 消息 |
| payload | 一些附加状态 |

<a name="removeIntent"></a>

## removeIntent(_id)
删除一个id

**Kind**: global function  

| Param | Description |
| --- | --- |
| _id | 删除对应id |

<a name="listIntent"></a>

## listIntent(belong)
列出intent

**Kind**: global function  

| Param | Description |
| --- | --- |
| belong | 属于谁 |

<a name="addIntentVector"></a>

## addIntentVector(_id, intent, text, vector, belong) ⇒
添加一个文本向量意图

**Kind**: global function  
**Returns**: 处理结果  

| Param | Type | Description |
| --- | --- | --- |
| _id | <code>\*</code> | 某个标识 |
| intent | <code>\*</code> | 意图 |
| text | <code>\*</code> | 对应回答 |
| vector | <code>\*</code> | 向量 |
| belong | <code>\*</code> | 属于哪个人或者群 |

<a name="loadExistsIntent"></a>

## loadExistsIntent()
读取已经存在的一些写死的意图

**Kind**: global function  
<a name="queryIntent"></a>

## queryIntent(text, belong, threshold, k) ⇒
查询一个意图，先把文本转换为向量，然后调用opensearch进行knn查找

**Kind**: global function  
**Returns**: 相似度大于阈值的意图或者空  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>\*</code> | 文本 |
| belong | <code>\*</code> | 属于的群或者人 |
| threshold | <code>\*</code> | 相似度阈值 |
| k | <code>\*</code> | 返回多少条 |

<a name="policy"></a>

## policy(msg, intent)
处理意图，根据意图去调用actions

**Kind**: global function  

| Param | Description |
| --- | --- |
| msg | 消息 |
| intent | 意图 file: 文件保存意图 url: 链接意图 search-file get-search-file remove-search-file list-file get-file remove-file |

