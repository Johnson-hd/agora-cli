import fs from 'fs'
import symbol from 'log-symbols'
import chalk from 'chalk'

import downloadGitRepo from 'download-git-repo'

/**
 * 校验文件夹是否存在
 * @param projectName 项目名称
 */
export const checkFolderExist = (projectName: string): boolean => {
  if (fs.existsSync(projectName)) {
    console.log(symbol.error, chalk.red(`${projectName} already exists, please change one`))
    return true
  } else {
    return false
  }
}

/**
 * 下载git仓库
 * @param projectName 项目名称
 * @param url git地址
 */
export const downloadGitProject = async (projectName, url) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(url, projectName, { clone: true }, err => {
      err ? reject(err) : resolve()
    })
  })
}
