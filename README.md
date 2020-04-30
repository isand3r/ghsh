# ghsh 

Github Secrets Helper - a tiny CLI utility to interact with github actions' secrets REST API.

## Installation

`npm i -g @isand3r/ghsh --registry=https://npm.pkg.github.com/isand3r`.

`ghsh --help` should now work.

## Usage

- `ghsh create secret -t myGithubAccessToken -n SECRET_NAME -v 'super_secret_value' -o isander -r myrepo ` - creates a secret on isand3r/myrepo with key/value pair `SECRET_NAME/super_secret_value`. If the secret `SECRET_NAME` already exists, overwrites the value.

- `ghsh delete secret -t myGithubAccessToken -n SECRET_NAME -o isand3r -r myrepo` - deletes secret `SECRET_NAME` from isand3r/myrepo

- `ghsh read secrets -t myGithubAccesstoken -o isand3r -r myrepo - lists all secrets that exist on isand3r/myrepo`
