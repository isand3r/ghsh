/*  
 * file: commands/create/secret.js
 */

const fs = require('fs')
const createGithubSecret = require('../../lib/apis/githubSecrets').create

module.exports = {
  command: 'secret',
  desc: 'create or update a secret on a github repo',
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
      name: {
        alias: 'n',
        type: 'string',
        required: true,
        nargs: 1
      },
      value: {
        alias: 'v',
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
    const { repo, owner, name, value, token} = argv
    const result = await createGithubSecret(repo, owner, name, value, token)
    if (result.status === 204) {
      console.log(`Secret "${name}" created on ${owner}/${repo}`)
    } else {
      console.log(result)
    }
  }
}
