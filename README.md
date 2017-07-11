[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

# encVox

encVox is an encrypted chat application built using Nodejs and Electron.

## Running the application

First you must have a [server](https://github.com/tylerstonge/encvox-server) to point it at, by default it looks for the server at localhost for testing purposes. If you wanted to deploy the server at a different address there currently is not a pretty way to do that, except changing [one line](https://github.com/tylerstonge/encvox-client/blob/master/index.js#L7) of code. Then enter the following commands.

```
npm install
npm i -g electron
electron .
```

## License
This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
