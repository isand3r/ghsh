#!/usr/bin/env node
require('yargs')
  .commandDir('commands')
  .demandCommand(1)
  .epilogue('A tiny cli utility to interact with the github secrets REST API.')
  .help()
  .parse()

