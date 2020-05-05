module.exports = {
  command: 'create',
  desc: 'create commands',
  builder: yargs => yargs
    .commandDir('create')
    .demandCommand(1)
    .strict()
}
