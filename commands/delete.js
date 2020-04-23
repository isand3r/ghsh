module.exports = {
  command: 'delete',
  desc: 'delete commands',
  builder: yargs => yargs
    .commandDir('delete')
    .demandCommand(1)
    .strict()
}