/*
 * @file lib/apis/githubSecrets.js
 * Github secrets API docs: https://developer.github.com/v3/actions/secrets
 */

const { Octokit } = require('@octokit/rest')
const sodium = require('tweetsodium')

/*
 *  Using libsodium, encrypts the secret using the repo's pubKey.
 *  Source: https://developer.github.com/v3/actions/secrets/#create-or-update-a-secret-for-a-repository
 */
const encryptSecret = (value, pubKey) => {
  const messageBytes = Buffer.from(value)
  const keyBytes = Buffer.from(pubKey, 'base64')
  const encryptedBytes = sodium.seal(messageBytes, keyBytes)
  return Buffer.from(encryptedBytes).toString('base64')
}

const initOctokit = (token) => {
   /* 
    * Init octokit with user's access token. 
    * NOTE: actions is part of the beta APIs.
    */
  return new Octokit({
    auth: token,
    previews: ['actions']
  })
}

module.exports = {
  create: async (repo, owner, name, value, token) => {
    const octokit = initOctokit(token)

    /* 
     * Get the repo's public key used to encrypt the secret.
     */
    const { key, key_id } = (await octokit.actions.getPublicKey({ owner, repo })).data

    /*
     * Creates a secret if it doesn't exist, overwrites encrypted value if it does.
     */
    return octokit.actions.createOrUpdateSecretForRepo(
      {
        key_id,
        owner,
        repo,
        name,
        encrypted_value: encryptSecret(value, key)
      }
    )
  },
  delete: async (repo, owner, name, token) => {
    const octokit = initOctokit(token)
    return octokit.actions.deleteSecretFromRepo({ owner, repo, name })
  },
  list: async (repo, owner, token) => {
    const octokit = initOctokit(token)
    return octokit.actions.listSecretsForRepo({ owner, repo })
  }

}
