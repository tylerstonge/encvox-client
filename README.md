# encVox

encVox is an encrypted chat application built using Nodejs and Electron.

## Running the application

First you must have a [server](https://github.com/tylerstonge/encvox-server) to point it at, by default it looks for the server at localhost. If you wanted to deploy the server at a different address there currently is not a pretty way to do that, except changing [one line](https://github.com/tylerstonge/encvox-client/blob/master/index.js#L7) of code. Then enter the following commands.

```
npm install
npm i -g electron
electron .
```

## License
This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
