import fs from 'fs'

/**
 * 获取机器人当前版本
 * @returns 版本
 */
export function getVersion() {
    const version = JSON.parse(fs.readFileSync('package.json')).version
    return version
}
