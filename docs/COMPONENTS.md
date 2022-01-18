## Constants

<dl>
<dt><a href="#docToText">docToText</a> ⇒</dt>
<dd><p>转换docx类型文件到纯文本</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#morningJob">morningJob(func)</a></dt>
<dd><p>早晨调用</p>
</dd>
<dt><a href="#nightJob">nightJob(func)</a></dt>
<dd><p>晚间调用</p>
</dd>
<dt><a href="#saveFile">saveFile(contactId, room, fileBox, user, urlFile)</a></dt>
<dd><p>保存文件</p>
</dd>
<dt><a href="#fileManage">fileManage(intent)</a></dt>
<dd><p>文件管理相关控制功能</p>
</dd>
<dt><a href="#imageCaption">imageCaption(b64)</a> ⇒</dt>
<dd><p>将文件转换为一句话描述，算法还有待优化</p>
</dd>
<dt><a href="#putObject">putObject(fileid, stream, size, metaData)</a></dt>
<dd><p>存放一个文件</p>
</dd>
<dt><a href="#removeObject">removeObject(fileid)</a></dt>
<dd><p>删除文件</p>
</dd>
<dt><a href="#listObjects">listObjects(prefix, recursive)</a></dt>
<dd><p>列出所有文件</p>
</dd>
<dt><a href="#getObject">getObject(fileid)</a> ⇒</dt>
<dd><p>获取文件</p>
</dd>
<dt><a href="#obj_detection">obj_detection(b64)</a> ⇒</dt>
<dd><p>识别图片中的对象</p>
</dd>
<dt><a href="#ocr">ocr(b64)</a> ⇒</dt>
<dd><p>对图片识别ocr文字</p>
</dd>
<dt><a href="#pdfToText">pdfToText(buf)</a> ⇒</dt>
<dd><p>解析PDF文件，返回纯文本</p>
</dd>
<dt><a href="#screenshot">screenshot(url, selector, invalidSelector, padding, waitInvalid, waitValid, maxWidth, maxHeight)</a> ⇒</dt>
<dd><p>调用在线的chrome进行截图
process.env.BROWSER || &#39;ws://localhost:10940&#39;</p>
</dd>
<dt><a href="#addData">addData(obj)</a></dt>
<dd><p>添加数据对象</p>
</dd>
<dt><a href="#removeData">removeData(fileid)</a></dt>
<dd><p>删除数据对象</p>
</dd>
<dt><a href="#listData">listData(path, from, size, detail)</a> ⇒</dt>
<dd><p>列出数据对象</p>
</dd>
<dt><a href="#searchData">searchData(path, text, from, size)</a> ⇒</dt>
<dd><p>搜索文件（文本）</p>
</dd>
<dt><a href="#textToText">textToText(buf)</a> ⇒</dt>
<dd><p>解析读取纯文本，还是有用的，因为文本对象编码可能有问题</p>
</dd>
<dt><a href="#textVector">textVector(text)</a> ⇒</dt>
<dd><p>文字转换为向量，类似谷歌的Universal Sentence Encoder
需要外部服务
process.env.TEXT_VECTOR || &#39;<a href="http://localhost:10950/api/encode&#39;">http://localhost:10950/api/encode&#39;</a></p>
</dd>
<dt><a href="#addTodo">addTodo(obj)</a></dt>
<dd><p>添加一个todo</p>
</dd>
<dt><a href="#updateTodo">updateTodo(obj)</a></dt>
<dd><p>更新todo对象</p>
</dd>
<dt><a href="#listTodo">listTodo(contactId, status)</a> ⇒</dt>
<dd><p>列出todo</p>
</dd>
<dt><a href="#todoJob">todoJob(bot, time)</a> ⇒</dt>
<dd><p>生成用于早间/晚间提醒的文本，如果有todo的话</p>
</dd>
</dl>

<a name="docToText"></a>

## docToText ⇒
转换docx类型文件到纯文本

**Kind**: global constant  
**Returns**: 纯文本  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>\*</code> | 文件的buf |

<a name="morningJob"></a>

## morningJob(func)
早晨调用

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>\*</code> | 待调用的函数 |

<a name="nightJob"></a>

## nightJob(func)
晚间调用

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>\*</code> | 待调用的函数 |

<a name="saveFile"></a>

## saveFile(contactId, room, fileBox, user, urlFile)
保存文件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| contactId | <code>\*</code> | 联系人ID |
| room | <code>\*</code> | 是否是群 |
| fileBox | <code>\*</code> | 文件对象 |
| user | <code>\*</code> | 用户信息 |
| urlFile | <code>\*</code> | 是否是URL链接来的文件 |

<a name="fileManage"></a>

## fileManage(intent)
文件管理相关控制功能

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| intent | <code>\*</code> | 意图 |

<a name="imageCaption"></a>

## imageCaption(b64) ⇒
将文件转换为一句话描述，算法还有待优化

**Kind**: global function  
**Returns**: 图片的描述  

| Param | Type | Description |
| --- | --- | --- |
| b64 | <code>\*</code> | 图片base64编码 |

<a name="putObject"></a>

## putObject(fileid, stream, size, metaData)
存放一个文件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fileid | <code>\*</code> | 文件ID |
| stream | <code>\*</code> | 文件buf |
| size | <code>\*</code> | 大小 |
| metaData | <code>\*</code> | 一些随文件的meta信息 |

<a name="removeObject"></a>

## removeObject(fileid)
删除文件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fileid | <code>\*</code> | 文件ID |

<a name="listObjects"></a>

## listObjects(prefix, recursive)
列出所有文件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>\*</code> | 前缀 |
| recursive | <code>\*</code> | 是否递归 |

<a name="getObject"></a>

## getObject(fileid) ⇒
获取文件

**Kind**: global function  
**Returns**: 文件buf  

| Param | Type | Description |
| --- | --- | --- |
| fileid | <code>\*</code> | 文件ID |

<a name="obj_detection"></a>

## obj\_detection(b64) ⇒
识别图片中的对象

**Kind**: global function  
**Returns**: 对象数组  

| Param | Type | Description |
| --- | --- | --- |
| b64 | <code>\*</code> | 图片 |

<a name="ocr"></a>

## ocr(b64) ⇒
对图片识别ocr文字

**Kind**: global function  
**Returns**: ocr结果文本  

| Param | Type | Description |
| --- | --- | --- |
| b64 | <code>\*</code> | 图片base64 |

<a name="pdfToText"></a>

## pdfToText(buf) ⇒
解析PDF文件，返回纯文本

**Kind**: global function  
**Returns**: 文字  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>\*</code> | 文件 |

<a name="screenshot"></a>

## screenshot(url, selector, invalidSelector, padding, waitInvalid, waitValid, maxWidth, maxHeight) ⇒
调用在线的chrome进行截图
process.env.BROWSER || 'ws://localhost:10940'

**Kind**: global function  
**Returns**: 图片或空  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | 链接 |
| selector | <code>\*</code> | 需要截取的部分的css selector，如果要全部可以写body |
| invalidSelector | <code>\*</code> | 遇到了这个selector则返回失败，可以为null |
| padding | <code>\*</code> | 截取四周的padding，就是扩大一圈，0到正无穷 |
| waitInvalid | <code>\*</code> | 等待失败的时间 |
| waitValid | <code>\*</code> | 等待成功的时间 |
| maxWidth | <code>\*</code> | 截取部分最大宽度 |
| maxHeight | <code>\*</code> | 截取部分最大高度 |

<a name="addData"></a>

## addData(obj)
添加数据对象

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | 对象 |

<a name="removeData"></a>

## removeData(fileid)
删除数据对象

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fileid | <code>\*</code> | 文件id |

<a name="listData"></a>

## listData(path, from, size, detail) ⇒
列出数据对象

**Kind**: global function  
**Returns**: 列出文件的数据信息  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>\*</code> | 路径 |
| from | <code>\*</code> | 翻页的offset |
| size | <code>\*</code> | 翻页的每页多少条 |
| detail | <code>\*</code> | 是否返回详细数据 |

<a name="searchData"></a>

## searchData(path, text, from, size) ⇒
搜索文件（文本）

**Kind**: global function  
**Returns**: 结果数组  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>\*</code> | 路径 |
| text | <code>\*</code> | 关键词 |
| from | <code>\*</code> | 翻页的offset |
| size | <code>\*</code> | limit |

<a name="textToText"></a>

## textToText(buf) ⇒
解析读取纯文本，还是有用的，因为文本对象编码可能有问题

**Kind**: global function  
**Returns**: 文本  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>\*</code> | 文本buf |

<a name="textVector"></a>

## textVector(text) ⇒
文字转换为向量，类似谷歌的Universal Sentence Encoder
需要外部服务
process.env.TEXT_VECTOR || 'http://localhost:10950/api/encode'

**Kind**: global function  
**Returns**: 向量  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>\*</code> | 待转换的文本 |

<a name="addTodo"></a>

## addTodo(obj)
添加一个todo

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | todo内容 |

<a name="updateTodo"></a>

## updateTodo(obj)
更新todo对象

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | todo内容 |

<a name="listTodo"></a>

## listTodo(contactId, status) ⇒
列出todo

**Kind**: global function  
**Returns**: todo信息  

| Param | Type | Description |
| --- | --- | --- |
| contactId | <code>\*</code> | 联系人 |
| status | <code>\*</code> | 状态 |

<a name="todoJob"></a>

## todoJob(bot, time) ⇒
生成用于早间/晚间提醒的文本，如果有todo的话

**Kind**: global function  
**Returns**: 用于早间/晚间提醒的文本  

| Param | Type | Description |
| --- | --- | --- |
| bot | <code>\*</code> | 机器人 |
| time | <code>\*</code> | 时间，morning/night |

