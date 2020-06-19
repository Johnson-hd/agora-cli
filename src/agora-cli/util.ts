import inquirer from 'inquirer'
import fs from 'fs'

import { createProjectAnswers } from './model'

/**
 * 更新packageJson文件
 * @param fileName packageJson文件名
 * @param updateObj 要更新的对象
 */
export const updatePackageJSON = (fileName: string, updateObj: createProjectAnswers) => {
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName).toString()
    const json = JSON.parse(data)
    Object.keys(updateObj).forEach(key => {
      json[key] = updateObj[key]
    })
    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
  }
}

/**
 * 创建项目提示
 */
export const createProjectPrompt = async () => {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'please choose project template: ',
      choices: ['vue', 'react'],
    },
    {
      type: 'input',
      name: 'description',
      message: 'please enter project description: ',
    },
    {
      type: 'input',
      name: 'author',
      message: 'please enter author: ',
    },
  ])
}
