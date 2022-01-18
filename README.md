# JuziBot

## 工作任务

WIP

## 模块

```
src/components
- cron node版本的crontab
- doc-to-text docx转换为文本
- file-manage 文件管理
- image-caption 图片转换为句子（本地REST）
- minio 对象存储
- obj-detection 图片中对象识别（本地REST）
- ocr 图片中文字识别（本地REST）
- pdf-to-text PDF转换文本
- screenshot 网页截图（本地REST）
- search 搜索文本/文件
- text-to-text txt文本
- text-to-vector 文本到向量（本地REST）
- todo 待办事项
- url-to-file URL保存到PDF
```

## 功能

### 备忘录

- 输入形式：
  - 直接输入的文本、转发的文本
    - 输入文本如果包含标签符号，则识别标签
  - 语音输入、图片、视频、链接存储等多媒体信息
    - 在多媒体信息后，如果输入标签符号，则识别标签
  - 输入文本中包含标签符号
- 具体说明：
  - 直接储存用户输入的信息
  - 针对各种类型的信息解析和保存
  - 基于web端的信息查看
  - 注意，用户自己输入的标签为一级标签，机器自动识别度标签为二级标签

### TODO列表（有提醒）

- 输入形式：
  - 橘子今天七点要干饭
  - 小橘子我七点要干饭
  - 小桔今天7点要干饭
  - #今天七点要干饭
- 具体说明：
  - 根据用户输入的todo建立todo list
  - 如果发现时间，进行定时提醒（用户可自定义，比如今天七点要干饭，小橘子就会在七点提示用户）
  - 用户可以在小程序/web标记完成todo（在聊天框标记很麻烦，预测使用频率低，可以测试吗？）

### 搜索指令

- 输入形式：
  - 起始符号搜索+关键词
  - 起始符号搜+关键词
  - 起始符号找+关键词
- example
  - #搜索小狗
  - /搜索小狗
  - 小桔搜索小狗
  - 橘子搜小狗
- 具体说明：
搜索关键词（标签）返回相关文件、信息列表
列表后每一条都有【打开】按钮（链接），点击按钮打开详细界面（web/小程序）

### 其他指令

- 所有其他指令以：
  - 起始符号指令名
- 例如：
  - #指令名
  - /指令名
  - 小橘指令名
  - 小橘子指令名
  - 橘子指令名
  - 桔子指令名
  - 小桔子指令名
- 指令：
  - 打开web/小程序管理界面
    - 群文件
    - 我的文件

## 可配置环境变量

WIP

```
BROWSER=ws://localhost:10940

MINIO_BUCKET=juzibot
MINIO_HOST=localhost
MINIO_PORT=10900
MINIO_USER=admin
MINIO_PASSWORD=admin123456

ES_INDEX=juzibot
ES_ADDR=https://admin:admin@localhost:9200/
TODO_ES_INDEX=juzibot_todo
```

## 安装依赖

系统依赖：

```
apt-get install poppler-utils
```

### PanGu-GEN服务

端口

端口：11920

```
docker run -d --restart=always --name=pangu-gen -p 11920:8000 qhduan/onnx-pangu-gen:0.1
```

### CPM-GEN服务

端口：11910

```bash
docker run -d --restart=always --name=cpm-gen -p 11910:8000 qhduan/onnx-cpm-gen:0.1
```

### 关键词提取
端口：12930

```bash
docker run -d --restart=always --name=kw-extraction -p 12930:8000 qhduan/kw-extraction:0.1
```

### Object detection

端口：12920

```bash
docker run -d --restart=always --name=obj-detection -p 12920:8000 qhduan/obj-dectection:0.1
```

### OCR服务

端口：12910

```bash
docker run -d --restart=always --name=paddle-ocr -p 12910:8000 qhduan/pdocr-api:0.1
```

### 图片转文字服务

端口：10970

```bash
docker run -d --restart=always --name=image-caption -p 10970:8000 qhduan/image-caption:0.2
```

### 文字向量服务

端口：10950

```bash
docker run -d --restart=always --name=onnx-cpm-sts -p 10950:8000 qhduan/onnx-cpm-sts:0.1
```

### 浏览器

端口：10940

```bash
docker run -d --restart=always --name chrome -p 10940:3000 browserless/chrome
```

### 对象存储

端口：10900

```bash
docker run -p 10900:9000 --name minio \
    -d --restart=always \
    -e MINIO_ROOT_USER=admin \
    -e MINIO_ROOT_PASSWORD=admin123456 \
    -v /minio_data:/data \
    minio/minio server /data
```

### 数据库

端口：9200

```bash

cd opensearch && docker-compose up -d

# https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-cjk-bigram-tokenfilter.html

curl -X PUT -k "https://admin:admin@localhost:9200/juzibot?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "han_bigrams": {
          "tokenizer": "standard",
          "filter": [ "han_bigrams_filter" ]
        }
      },
      "filter": {
        "han_bigrams_filter": {
          "type": "cjk_bigram",
          "ignored_scripts": [
            "hangul",
            "hiragana",
            "katakana"
          ],
          "output_unigrams": true
        }
      }
    }
  }
}
'

curl -X PUT -k "https://admin:admin@localhost:9200/juzibot_todo?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "han_bigrams": {
          "tokenizer": "standard",
          "filter": [ "han_bigrams_filter" ]
        }
      },
      "filter": {
        "han_bigrams_filter": {
          "type": "cjk_bigram",
          "ignored_scripts": [
            "hangul",
            "hiragana",
            "katakana"
          ],
          "output_unigrams": true
        }
      }
    }
  }
}
'

curl -X PUT -k "https://admin:admin@localhost:9200/juzibot-intent?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "index": {
      "knn": true,
      "knn.algo_param.ef_search": 100
    }
  },
  "mappings": {
    "properties": {
      "intent" : {
        "type" : "text",
        "fields" : {
          "keyword" : {
            "type" : "keyword",
            "ignore_above" : 256
          }
        }
      },
      "vector": {
        "type": "knn_vector",
        "dimension": 512,
        "method": {
          "name": "hnsw",
          "space_type": "cosinesimil",
          "engine": "nmslib",
          "parameters": {
            "ef_construction": 256,
            "m": 48
          }
        }
      }
    }
  }
}
'


```


## 其他操作

### 数据库操作

不要轻易执行

删除某个index：

```
curl -X DELETE -k "https://admin:admin@localhost:9200/juzibot-intent?pretty"
```
