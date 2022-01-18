## Functions

<dl>
<dt><a href="#actionAnswerQuestion">actionAnswerQuestion()</a></dt>
<dd><p>问答功能
ret = requests.post(
    &#39;<a href="https://pretrain.aminer.cn/api/v1/poem&#39;">https://pretrain.aminer.cn/api/v1/poem&#39;</a>,
    json={
        &quot;key&quot;:&quot;queue1&quot;,
        &quot;topic&quot;: &quot;干饭人&quot;,
        &quot;author&quot;:&quot;李白&quot;,
        &quot;speed&quot;: &quot;fast&quot;,
        &quot;apikey&quot;: apikey, 
        &quot;apisecret&quot;: apisecret
    }
)</p>
</dd>
<dt><a href="#actionBye">actionBye(msg, intent)</a></dt>
<dd><p>再见</p>
</dd>
<dt><a href="#actionIntentManage">actionIntentManage(msg, intent)</a></dt>
<dd><p>提示意图管理地址</p>
</dd>
<dt><a href="#actionFileManage">actionFileManage(msg, intent)</a></dt>
<dd><p>文件管理相关功能</p>
</dd>
<dt><a href="#actionGreet">actionGreet(msg, intent)</a></dt>
<dd><p>自我介绍</p>
</dd>
<dt><a href="#actionSaveNote">actionSaveNote(msg, intent)</a></dt>
<dd><p>笔记相关</p>
</dd>
<dt><a href="#actionBeginNote">actionBeginNote(msg, intent)</a></dt>
<dd><p>提示开始记录</p>
</dd>
<dt><a href="#actionReboot">actionReboot(msg, intent)</a></dt>
<dd><p>重启功能</p>
</dd>
<dt><a href="#actionSaveFile">actionSaveFile(msg, intent)</a></dt>
<dd><p>文件保存相关</p>
</dd>
<dt><a href="#actionSaveUrl">actionSaveUrl(msg, intent)</a></dt>
<dd><p>URL保存相关</p>
</dd>
<dt><a href="#actionAddTodo">actionAddTodo(msg, intent)</a></dt>
<dd><p>添加待办事项功能</p>
</dd>
<dt><a href="#actionListTodo">actionListTodo(msg, intent)</a></dt>
<dd><p>列出待办事项，只列出最后10条，更多点击web版本查看</p>
</dd>
<dt><a href="#actionMarkTodo">actionMarkTodo(msg, intent)</a></dt>
<dd><p>把todo标记为完成</p>
</dd>
</dl>

<a name="actionAnswerQuestion"></a>

## actionAnswerQuestion()
问答功能
ret = requests.post(
    'https://pretrain.aminer.cn/api/v1/poem',
    json={
        "key":"queue1",
        "topic": "干饭人",
        "author":"李白",
        "speed": "fast",
        "apikey": apikey, 
        "apisecret": apisecret
    }
)

**Kind**: global function  

<a name="actionBye"></a>

## actionBye(msg, intent)
再见

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionIntentManage"></a>

## actionIntentManage(msg, intent)
提示意图管理地址

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionFileManage"></a>

## actionFileManage(msg, intent)
文件管理相关功能

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionGreet"></a>

## actionGreet(msg, intent)
自我介绍

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionSaveNote"></a>

## actionSaveNote(msg, intent)
笔记相关

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionBeginNote"></a>

## actionBeginNote(msg, intent)
提示开始记录

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionReboot"></a>

## actionReboot(msg, intent)
重启功能

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionSaveFile"></a>

## actionSaveFile(msg, intent)
文件保存相关

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionSaveUrl"></a>

## actionSaveUrl(msg, intent)
URL保存相关

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionAddTodo"></a>

## actionAddTodo(msg, intent)
添加待办事项功能

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionListTodo"></a>

## actionListTodo(msg, intent)
列出待办事项，只列出最后10条，更多点击web版本查看

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |

<a name="actionMarkTodo"></a>

## actionMarkTodo(msg, intent)
把todo标记为完成

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>\*</code> | 消息 |
| intent | <code>\*</code> | 意图 |
