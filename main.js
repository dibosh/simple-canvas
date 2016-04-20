'use strict'

window.onload = function() {
  var form = $( 'form' );

  form.submit( function( event ) {
    event.preventDefault();

    var form_data = new FormData( $(this)[0] );

    $.ajax( {
      url: '/uploads',
      type: 'POST',
      data: form_data,
      contentType: false,
      processData: false,
      success: function(result) {
        addImage( result.file );
        form.find( 'input[type="file"]' ).val('');
      }
    })
  })

  $.get( '/images', function( files ) {
    files.forEach( addImage );
  })

  function addImage( path ) {
    var img = document.createElement( 'img' );
    img.src = path;
    img.width = 100;
    img.height = 100;
    img.style.float = 'left';
    $( '#image_list' ).prepend( img );
  }
}
