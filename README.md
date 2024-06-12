
<h1 align="center">
  Product Mannager
</h1>

<h4 align="center">A product mannager using Node.js</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://github.com/GustavoSMafra/product-manager-mongoose/blob/main/imgs/product-mannager-api.png)

## Key Features

* Create, read, update and delete products
* Add image to products (images saved in firebase bucket)
* JWT verification on APIs
* Swagger documentation

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/GustavoSMafra/product-manager-mongoose.git

# Go into the repository
$ cd product-manager-mongoose

# Install dependencies
$ npm install

# Run the app
$ npm start
```
> **Localhost**
> Don't forget to create a .env with the necessary information, all you need is a local database and a secret key that will be used by bcrypt. (All you need is in the .env-default file)
>
>  Additionally, it is necessary to create a file called keys with the configuration for accessing firebase (a JSON file)

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Download

You can [download](https://github.com/GustavoSMafra/product-manager-mongoose) the latest installable version of TaskMaster for Windows, macOS and Linux.

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://expressjs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)


## License

[MIT](https://github.com/GustavoSMafra/product-manager-mongoose/blob/main/LICENSE) © [Gustavo Mafra ](https://www.linkedin.com/in/gustavosmafra/)
