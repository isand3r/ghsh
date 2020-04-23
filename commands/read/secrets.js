/*  
 * file: commands/read/secrets.js
 */

const fs = require('fs')
const listGithubSecrets = require('../../lib/apis/githubSecrets').list

module.exports = {
  command: 'secrets',
  desc: 'list secrets on a github repo',
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
      }
    }),
  handler: async (argv) => {
    const { repo, owner, token} = argv
    const result = await listGithubSecrets(repo, owner, token)
    if (result.status === 200) {
      console.log(result.data)
    } else {
      console.log(result)
    }
  }
}
