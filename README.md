# Readable

Readable is a post and comment responsive single-page application. Users can create posts under a chosen category, comment on posts, edit/delete or vote on posts or comments, and sort posts or comments by time or votes.

## Documentation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You only need [**Node.js**](https://nodejs.org/en/) installed.

### Install 

Git clone this repository then change your current directory. 

```
$ git clone https://github.com/Waleed-BS/Readable.git
$ cd Readable
```

The client and the server specify their own dependencies independently.

* Install [server](https://github.com/Waleed-BS/Readable/blob/master/api-server/README.md) dependencies.

```
$ npm --prefix ./api-server install ./api-server
```

* Install client dependencies
```
$ npm install
```

### Run 

Run [**express**](https://expressjs.com/) server.

```
$ node ./api-server/server
```

Run [**webpack**](https://webpack.js.org/) developer server 


```
$ npm start 
```
