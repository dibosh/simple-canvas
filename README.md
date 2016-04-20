## To set up the environment dependencies
```
$ npm install
```

## To run the node server

```
$ npm run start
```

Server is listening to port `8000`

## Instruction on file upload

To allow file uploaded to node server, your form `enctype` has to be `multipart/form-data` and point your form action to `/uploads`
The server only accepts `png` and `jpeg` file format

