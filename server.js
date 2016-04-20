'use strict'

const express = require( 'express' );
const multer = require( 'multer' );
let app = express();

app.use( express.static('./') );

// define file name and destination to save
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname +  '/images')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split( '.' );
    ext = ext[ext.length - 1];
    let name = file.originalname.replace( '.' + ext, '' );
    cb(null,  name + '-' + Date.now() + '.' + ext);
  }
});

// define what file type to accept
let filter = ( req, file, cb ) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
    cb( null, true );
  } else {
    cb( 'Failed: format not supported' );
  }
}

// set multer config
let upload = multer( {
  storage: storage,
  fileFilter: filter
}).single( 'upload' );

// route for file upload
app.post( '/uploads', ( req, res ) => {
  upload( req, res, err => {
    if ( err ) {
      res.end( err )
    } else {
      res.end( 'success' )
    }
  })
})

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
})

var server = app.listen( 8000, _ => {
  console.log( 'server started. listening to 8000' );
})