import { configPath, defaultConfig } from '../constants.js'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { decode, encode } from 'ini'

export default function (value, option) {
  const { exists, config } = getAllConfig()
  const action = Object.keys(option)[0]
  const key = option[action]
  if (action === 'get') {
    console.log(config[key])
  } else if (action === 'set') {
    config[key] = value
    writeFileSync(configPath, encode(config))
  } else if (action === 'delete') {
    delete config[key]
    if (exists) {
      writeFileSync(configPath, encode(config))
    }
  }
}
export function getAllConfig () {
  let config: any = {} // 所有的配置信息
  let exists = existsSync(configPath)
  if (exists) {
    let userConfig = decode(readFileSync(configPath, 'utf-8'))
    Object.assign(config, defaultConfig, userConfig)
  }
  return { exists, config }
}
