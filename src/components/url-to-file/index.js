
import fs from 'fs'
import puppeteer from 'puppeteer-core'
import tempfile from 'tempfile'
import process from 'process'
import { FileBox } from 'file-box'
import rp from 'request-promise'
import cheerio from 'cheerio'

const browserWSEndpoint = process.env.BROWSER || 'ws://localhost:10940'


export async function urlToFile(url) {
    const document = null;
    const browser = await puppeteer.connect({ browserWSEndpoint });
    console.log('link to remote %s', url)
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 738 })
    await page.goto(url);

    // console.log('wait dom loaded')
    // // consider navigation to be finished when the DOMContentLoaded event is fired.
    // await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    // // consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
    // console.log('wait networkidle')
    // await page.waitForNavigation({waitUntil: 'networkidle2'})

    let data = await page.evaluate(() => {
        const title = document.querySelector('title')
        const body = document.querySelector('body')
        const ret = {
            title: '',
            content: '',
        }
        if (title) {
            ret['title'] = title.textContent.trim()
        }
        if (body) {
            document.querySelectorAll('body script').forEach(e => { e.parentNode.removeChild(e) })
            document.querySelectorAll('body style').forEach(e => { e.parentNode.removeChild(e) })
            ret['content'] = body.textContent.trim()
        }
        return ret
    })

    let ret = {
        ...data,
        buf: null,
    }

    const filepath = tempfile('.pdf')
    // await page.pdf({ path: filepath, format: 'A4' })
    await page.pdf({ path: filepath })
    if (fs.existsSync(filepath)) {
        ret['buf'] = fs.readFileSync(filepath)
        fs.unlink(filepath, err => {
            if (err) {
                console.error(err)
            }
        })
    }
    await page.close()
    return ret
}

export async function arxivUrlToFile(url) {
    var abs_url, pdf_url
    if (url.endsWith('pdf')) {
        pdf_url = url
        abs_url = url.replace('/pdf/', '/abs/').replace('.pdf', '')
    } else {
        pdf_url = url.replace('/abs/', '/pdf/') + '.pdf'
        abs_url = url
    }
    const headers = {
        'Host': 'arxiv.org',
        'Refer': pdf_url,
        'User-Agent':
            'NoSuchBrowser/1.0'
    }

    var options = {
        url: abs_url, encoding: null, headers: headers,
        transform: body => {
            return cheerio.load(body);
        }
    }

    const pg = await rp(options)
    const content = pg(".subheader h1").text()
    const title = pg("head title").text()
    var abst = pg("blockquote").text()

    abst = abst.replace(/\n/g, ' ').replace('Abstract:', '')
    abst = abst.trim()

    options = {
        url: pdf_url, encoding: null, headers: headers
    }

    const ret = await rp(options)
    const fileBox = FileBox.fromBuffer(ret, title + '.pdf')
    
    return {
        fileBox,
        title,
        content,
        abst
    }
}
// console.log(await urlToFile('http://m.news.cctv.com/2021/08/11/ARTInGraUCaFrs9Ff9wj6jfP210811.shtml'))
