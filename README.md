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

WIP

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
