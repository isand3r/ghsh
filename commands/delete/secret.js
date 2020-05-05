/*
 * file: commands/delete/secret.js
 */

const deleteGithubSecret = require('../../lib/apis/githubSecrets').delete

module.exports = {
  command: 'secret',
  desc: 'delete a secret on a github repo',
  builder: yargs => yargs
    .option({
      token: {
        alias: 't',
        desc: 'github personal access token',
        type: 'string',
        required: true,
        nargs: 1
      },
      repo: {
        alias: 'r',
        desc: 'github repo name',
        type: 'string',
        required: true,
        nargs: 1
      },
      owner: {
        alias: 'o',
        desc: 'github repo owner',
        type: 'string',
        required: true,
        nargs: 1
      },
      name: {
        alias: 'n',
        desc: 'secret name',
        type: 'string',
        required: true,
        nargs: 1
      }
    }),
  handler: async (argv) => {
    const { repo, owner, name, token } = argv
    const result = await deleteGithubSecret(repo, owner, name, token)
    if (result.status === 204) {
      console.log(`Secret "${name}" deleted from ${owner}/${repo}`)
    } else {
      console.log(result)
    }
  }
}
