'use strict'

let canvas = null;
let mousedown$ = null;
let mousemove$ = null;
let mouseup$ = null;
let keydown$ = null;
let mousedrag$ = null;

function init() {

  // canvas model
  let block = document.querySelector( '.block' );
  canvas = new Canvas( block );

  mousedown$ = Rx.Observable.fromEvent( document, 'mousedown' );
  mousemove$ = Rx.Observable.fromEvent( document, 'mousemove' );
  mouseup$ = Rx.Observable.fromEvent( document, 'mouseup' );
  keydown$ = Rx.Observable.fromEvent( document, 'keydown' );

  keydown$.subscribe( canvas.keydown.bind( canvas ) );

  // form submission using ajax;
  document.querySelector( '#submit' ).addEventListener( 'click', event => {
    event.preventDefault();

    let file = document.querySelector( 'input[type="file"]' );
    if ( file.value == '' ) {
      alert( 'Please select an image to upload' );
      return false;
    }

    let form_data = new FormData();
    form_data.append( 'upload', file.files[0] )
    let promise = ajax( '/uploads', 'POST', form_data );

    promise
      .then( result => {
        // on success
        if ( result.status == 'success' ) {
          addImage( result.file );
          file.value = '';
        }
      })
      // on error
      .catch( _ => { alert( 'Oops! something went wrong' ) } );
  });

  // attach event for add text button
  document.querySelector( '#addText' ).addEventListener( 'click', function() {
    createText();
  });

  // populate images
  populateImage();
}

function populateImage() {
  let promise = ajax( '/images', 'GET' )
  promise.then( files => {
    files.forEach( addImage );
  });
}

function addImage( path ) {
  let li = document.createElement( 'li' );
  li.classList.add( 'img-rounded' );
  let img = document.createElement( 'img' );
  img.src = path;
  li.appendChild( img );
  let ul = document.querySelector( '.list-unstyled' )
  ul.insertBefore( li, ul.firstChild );

  // attach event for add image
  li.addEventListener( 'click', e => {
    createImg( img );
  })
}

function createText() {
  let txt = new Txt();
  mousedown$.subscribe( txt.mousedown.bind( txt ) );
  // drag$.subscribe( txt.mousemove.bind( txt ) );

  canvas.add( txt );
}

function createImg( el ) {
  let img = new Img( el.cloneNode( true ) );
  mousedown$.subscribe( img.mousedown.bind( img ) );
  // mouseup$.subscribe( img.mouseup.bind( img ) );
  // mousedrag$.subscribe( img.mousemove.bind( img ) );
  canvas.add( img );
}

// starting point
window.onload = () => { init(); };

