# ghsh 

Github Secrets Helper - a tiny CLI utility to interact with github actions' secrets REST API.

## Installation

Due to the wierd way github package registry works - you need to set your registry to https://npm.pkg.github.com/isand3r or you won't be able to install `ghsh` dependencies.

Then run `npm i -g @isand3r/ghsh`.

`ghsh --help` should now work.

## Usage

- `ghsh create secret -t myGithubAccessToken -n SECRET_NAME -v 'super_secret_value' -o isander -r secgrit ` - creates a secret on isand3r/secgrit with key/value pair `SECRET_NAME/super_secret_value`. If the secret `SECRET_NAME` already exists, overwrites the value.

- `ghsh delete secret -t myGithubAccessToken -n SECRET_NAME -o isand3r -r secgrit` - deletes secret `SECRET_NAME` from isand3r/secgrit

- `ghsh read secrets -t myGithubAccesstoken -o isand3r -r secgrit - lists all secrets that exist on isand3r/secgrit`
