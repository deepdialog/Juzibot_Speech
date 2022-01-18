
import Minio from 'minio'
import process from 'process'

const BUCKET_NAME = process.env.MINIO_BUCKET || 'juzibot'

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST || 'localhost',
    port: process.env.MINIO_PORT || 10900,
    useSSL: false,
    accessKey: process.env.MINIO_USER || 'admin',
    secretKey: process.env.MINIO_PASSWORD || 'admin123456'
})

function makeBucket() {
    return new Promise((resolve, reject) => {
        minioClient.makeBucket(BUCKET_NAME, BUCKET_NAME, (err) => {
            if (err) {
                if (err.toString().indexOf('Your previous request to create the named bucket succeeded and you already own it.') < 0) {
                    return reject(err)
                }
            }
            return resolve()
        })
    })
}

/**
 * 存放一个文件
 * @param {*} fileid 文件ID
 * @param {*} stream 文件buf
 * @param {*} size 大小
 * @param {*} metaData 一些随文件的meta信息
 */
export function putObject(fileid, stream, size, metaData) {
    return new Promise((resolve, reject) => {
        minioClient.putObject(BUCKET_NAME, fileid, stream, size, metaData, err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

/**
 * 删除文件
 * @param {*} fileid 文件ID
 */
export function removeObject(fileid) {
    return new Promise((resolve, reject) => {
        minioClient.removeObject(BUCKET_NAME, fileid, err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

/**
 * 列出所有文件
 * @param {*} prefix 前缀
 * @param {*} recursive 是否递归
 */
export function listObjects(prefix='', recursive=true) {
    return new Promise((resolve, reject) => {
        // Do not use listObjects, use listObjectsV2: https://github.com/minio/minio-js/issues/876
        const stream = minioClient.listObjectsV2(BUCKET_NAME, prefix, recursive)
        let returned = false
        const data = []
        stream.on('data', obj => {
            data.push(obj)
        })
        stream.on('end', () => {
            if (!returned) {
                returned = true
                return resolve(data)
            }
        })
        stream.on('error', err => {
            if (!returned) {
                returned = true
                reject(err)
            }
        })
    })
}

/**
 * 获取文件
 * @param {*} fileid 文件ID
 * @returns 文件buf
 */
export async function getObject(fileid) {
    return new Promise((resolve, reject) => {
        minioClient.getObject(BUCKET_NAME, fileid, (err, stream) => {
            if (err) {
                return reject(err)
            }
            let buf = []
            stream.on('data', chunk => {
                buf.push(chunk)
            })
            stream.on('end', () => {
                resolve(Buffer.concat(buf))
            })
            stream.on('error', function(err) {
                reject(err)
            })
        })
    })
}

await makeBucket()

// await putObject('test/test2.tar', Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]), 6, {
//     'Content-Type': 'application/octet-stream',
// })
// console.log('upload success')
// console.log(await listObjects('wechaty/'))
// console.log('1', await getObject('test/test2.tar'), '2')
// console.log(await removeObject("wechaty/7881302454907559/知识图谱在证券监管领域的应用.docx"))
