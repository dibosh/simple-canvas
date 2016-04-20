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
        console.log(result)
        form.find( 'input[type="file"]' ).val('');
      }
    })
  })
}
