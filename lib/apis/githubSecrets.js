/* eslint camelcase: 0 */
/*
 * @file lib/apis/githubSecrets.js
 * Github secrets API docs: https://developer.github.com/v3/actions/secrets
 */

const sodium = require('tweetsodium')
const https = require('https')

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

const request = async (path, method, token, body = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path,
      method,
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'request'
      }
    }
    let data = ''
    const req = https.request(options, res => {
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        resolve({ json: data ? JSON.parse(Buffer.from(data).toString('utf-8')) : {}, status: res.statusCode })
      })
    })
    if (method === 'PUT' || method === 'POST') {
      req.write(body)
    }
    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}

module.exports = {
  create: async (repo, owner, name, value, token) => {
    /*
     * Get the repo's public key used to encrypt the secret.
     */
    const { key, key_id } = (await request(
      `/repos/${owner}/${repo}/actions/secrets/public-key`,
      'GET',
      token
    )).json
    /*
     * Creates a secret if it doesn't exist, overwrites encrypted value if it does.
     */
    const body = JSON.stringify({ encrypted_value: encryptSecret(value, key), key_id })
    return request(
      `/repos/${owner}/${repo}/actions/secrets/${name}`,
      'PUT',
      token,
      body
    )
  },
  delete: async (repo, owner, name, token) => {
    return request(
      `/repos/${owner}/${repo}/actions/secrets/${name}`,
      'DELETE',
      token
    )
  },
  list: async (repo, owner, token) => {
    return request(
      `/repos/${owner}/${repo}/actions/secrets`,
      'GET',
      token
    )
  }
}
