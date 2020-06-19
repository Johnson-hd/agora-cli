#!/usr/bin/env node

import program from 'commander'

import PackageJson from '../../package.json'
import create from './command/create'

program
  .command('create')
  .option('<project-name>', 'project name')
  .description('create a new project powered by agora-cli')
  // .alias('c')
  .action(async () => {
    await create(process.argv[3])
  })

program.version(PackageJson.version, '-v --version')

program.command('*').action(() => {
  console.error('\nUnknown command')
  program.outputHelp()
})

program.parse(process.argv)
