
import puppeteer from 'puppeteer-core'
import process from 'process'

const browserWSEndpoint = process.env.BROWSER || 'ws://localhost:10940'

/**
 * 调用在线的chrome进行截图
 * process.env.BROWSER || 'ws://localhost:10940'
 * @param {*} url 链接
 * @param {*} selector 需要截取的部分的css selector，如果要全部可以写body
 * @param {*} invalidSelector 遇到了这个selector则返回失败，可以为null
 * @param {*} padding 截取四周的padding，就是扩大一圈，0到正无穷
 * @param {*} waitInvalid 等待失败的时间
 * @param {*} waitValid 等待成功的时间
 * @param {*} maxWidth 截取部分最大宽度
 * @param {*} maxHeight 截取部分最大高度
 * @returns 图片或空
 */
export async function screenshot(
    url,
    selector,
    invalidSelector=null,
    padding=2,
    waitInvalid=3000,
    waitValid=30000,
    maxWidth=null,
    maxHeight=null
) {
    const document = null;
    const browser = await puppeteer.connect({ browserWSEndpoint });
    console.log('link to remote %s %s', url, selector)
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 2048 })
    await page.goto(url);

    await page.waitForTimeout(waitInvalid)

    if (invalidSelector) {
        let notFound = await page.evaluate(({ invalidSelector }) => {
            let obj = document.querySelector(invalidSelector);
            if (obj) {
                return {
                    notFound: true,
                    candidate: Array.from(
                        document.querySelectorAll('a.result-title')
                    ).map(a => a.textContent.replace(/ - 百度百科/, '')),
                }
            }
            return {
                notFound: false
            }
        }, { invalidSelector })

        if (notFound.notFound) {
            return notFound
        }
    }

    try {
        await page.waitForSelector(selector, { timeout: waitValid / 2 })
    } catch (e) {
        console.error(e)
    }

    if (invalidSelector) {
        let notFound = await page.evaluate(({ invalidSelector }) => {
            let obj = document.querySelector(invalidSelector);
            if (obj) {
                return {
                    notFound: true,
                    candidate: Array.from(document.querySelectorAll('a.result-title > em')).map(a => a.textContent),
                }
            }
            return {
                notFound: false
            }
        }, { invalidSelector })
    
        if (notFound.notFound) {
            return notFound
        }
    }

    await page.waitForSelector(selector, { timeout: waitValid / 2 })

    const rect = await page.evaluate(({selector, padding}) => {
        let obj = document.querySelector(selector);
        if (obj) {
            const pos = obj.getBoundingClientRect()
            const body = document.querySelector('body').getBoundingClientRect()
            const ret = {
                x: pos.x - padding,
                y: pos.y - padding,
                width: pos.width + padding * 2,
                height: pos.height + padding * 2,
            }
            if (ret.x < 0) {
                ret.x = 0
            }
            if (ret.y < 0) {
                ret.y = 0
            }
            if (ret.width > body.width) {
                ret.width = body.width
            }
            if (ret.height > body.height) {
                ret.height = body.height
            }
            return ret
        }
    }, { selector, padding });
    console.log('got bound', rect)
    let ret = null
    if (rect) {
        if (maxWidth && rect.width > maxWidth) {
            rect.width = maxWidth
        }
        if (maxHeight && rect.height > maxHeight) {
            rect.height = maxHeight
        }
        const screenshot = await page.screenshot({
            clip: rect,
            encoding: 'base64',
            type: 'jpeg',
        })
        ret = screenshot
    }
    await page.close()
    return ret
}
