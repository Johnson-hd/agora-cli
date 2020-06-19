import symbol from 'log-symbols'
import chalk from 'chalk'
import ora from 'ora'

import { updatePackageJSON, createProjectPrompt } from '../util'
import { checkFolderExist, downloadGitProject } from '../../util'
import { createProjectAnswers } from '../model'

const create = async (projectName: string | undefined) => {
  if (!projectName) {
    console.log(symbol.error, chalk.red('project name must'))
    return
  }

  const isExist = checkFolderExist(projectName)
  if (!isExist) {
    const answers: createProjectAnswers = await createProjectPrompt()
    if (answers.template === 'react') {
      console.log(symbol.warning, chalk.yellow('react template is developing...'))
      process.exit(1)
    }

    const loading = ora('template downloading...')
    loading.start('template downloading...')

    let templateGitURL = ''
    switch (answers.template) {
      case 'vue':
        templateGitURL = 'direct:https://github.com/For-Article/vue-temlate.git'
        break
      case 'react':
        templateGitURL = 'direct:https://github.com/LuoYangYY/react-template.git'
        break
    }

    try {
      await downloadGitProject(projectName, templateGitURL)
      loading.succeed('template download complete!')
      answers.name = projectName
      updatePackageJSON(`${projectName}/package.json`, answers)
    } catch (e) {
      loading.fail('template download fail!')
    }
  }
}

export default create
