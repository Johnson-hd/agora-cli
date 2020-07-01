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
    fs.writeFileSync(fileName, JSON.stringify(json, null, 2), 'utf-8')
  }
}

/**
 * 创建前端项目提示
 */
export const createFrontendProjectPrompt = async () => {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'please choose project template:',
      choices: ['vue', 'react'],
    },
    {
      type: 'input',
      name: 'description',
      message: 'please enter project description:',
    },
    {
      type: 'input',
      name: 'author',
      message: 'please enter author:',
    },
  ])
}

/**
 * 创建后端项目提示
 */
export const createBackendProjectPrompt = async () => {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'please enter project description:',
    },
    {
      type: 'input',
      name: 'author',
      message: 'please enter author:',
    },
  ])
}

/**
 * 前后端选择提示
 */
export const frontendOrBackendPrompt = async () => {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'end',
      message: 'please choose frontend or backend: ',
      choices: ['frontend', 'backend'],
    },
  ])
}
