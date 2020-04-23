module.exports = {
  command: 'read',
  desc: 'read commands',
  builder: yargs => yargs
    .commandDir('read')
    .demandCommand(1)
    .strict()
}
