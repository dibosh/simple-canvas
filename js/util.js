'use strict'

function isEmpty( obj ) {
  return !Object.getOwnPropertyNames( obj ).length;
}

function ajax( url, method, data ) {
  return new Promise( ( success, failed ) => {
    let xhr = new XMLHttpRequest();
    xhr.open( method, url );
    xhr.onload = _ => {
      if ( xhr.status == 200 ) {
        success( JSON.parse( xhr.response ) );
      } else {
        failed( JSON.parse( xhr.statusText ) );
      }
    };
    xhr.onerror = _ => {
      failed( xhr.response.statusText );
    }
    xhr.send( data );
  });
}