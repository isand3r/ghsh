#!/usr/bin/env node
require('yargs')                                                                                                                                                                               
  .commandDir('commands')
  .demandCommand(1)
  .option({})
  .help()
  .parse()

