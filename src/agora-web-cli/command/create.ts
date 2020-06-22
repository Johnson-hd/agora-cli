import symbol from 'log-symbols'
import chalk from 'chalk'
import ora from 'ora'

import {
  updatePackageJSON,
  createFrontendProjectPrompt,
  createBackendProjectPrompt,
  frontendOrBackendPrompt,
} from '../util'
import { checkFolderExist, downloadGitProject } from '../../util'
import { createFrontendProjectAnswers, createProjectAnswers } from '../model'

const templates = {
  react: 'direct:https://github.com/Johnson-hd/agroa-react-template.git',
  vue: 'direct:https://github.com/Johnson-hd/agroa-vue-template.git',
  node: 'direct:https://github.com/Johnson-hd/agroa-node-template.git',
}

/**
 * 创建项目
 * @param projectName 项目名称
 */
const create = async (projectName: string | undefined) => {
  if (!projectName) {
    console.log(symbol.error, chalk.red('project name must'))
    return
  }

  const isExist = checkFolderExist(projectName)
  if (!isExist) {
    const fobAns = await frontendOrBackendPrompt()
    if (fobAns.end === 'frontend') {
      await createFrontend(projectName)
    } else {
      await createBackend(projectName)
    }
  }
}

/**
 * 创建前端项目
 * @param projectName 项目名称
 */
const createFrontend = async (projectName: string) => {
  const answers: createFrontendProjectAnswers = await createFrontendProjectPrompt()

  if (answers.template === 'react') {
    console.log(symbol.warning, chalk.yellow('react template is developing...'))
    process.exit(1)
  }

  const spinner = ora('template downloading...').start()

  let templateGitURL = ''
  switch (answers.template) {
    case 'vue':
      templateGitURL = templates.vue
      break
    case 'react':
      templateGitURL = templates.react
      break
  }

  await downloadGitProject(projectName, templateGitURL).catch(() => {
    spinner.fail('template download fail!')
    return
  })

  spinner.succeed('template download complete!')
  answers.name = projectName
  updatePackageJSON(`${projectName}/package.json`, answers)

  console.log(`
    cd ${chalk.yellow(projectName)}

    ${chalk.yellow('install')}: yarn

    ${chalk.yellow('start')}: yarn dev
  `)
}

/**
 * 创建后端项目
 * @param projectName 项目名称
 */
const createBackend = async (projectName: string) => {
  const answers: createProjectAnswers = await createBackendProjectPrompt()

  const spinner = ora('template downloading...').start()

  await downloadGitProject(projectName, templates.node).catch(() => {
    spinner.fail('template download fail!')
    return
  })

  spinner.succeed('template download complete!')
  answers.name = projectName
  updatePackageJSON(`${projectName}/package.json`, answers)

  console.log(`
    cd ${chalk.yellow(projectName)}

    ${chalk.yellow('install')}: yarn

    ${chalk.yellow('start')}: yarn dev
  `)
}

export default create
