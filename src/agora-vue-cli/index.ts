#!/usr/bin/env node

import program from 'commander'

import PackageJson from '../../package.json'

program.version(PackageJson.version, '-v --version')

program.command('*').action(() => {
  console.error('\nUnknown command')
  program.outputHelp()
})

program.parse(process.argv)
