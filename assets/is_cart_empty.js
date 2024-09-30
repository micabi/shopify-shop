document.addEventListener( 'DOMContentLoaded', () => {
  const flag = document.querySelector( '.is-empty' );

  if ( flag !== null ) {
    scheduledDisplayNone();
  }


  function scheduledDisplayNone () {
    const scheduled = document.querySelector( '#haisosm' );

    if ( scheduled !== null ) {
      console.log( scheduled );
      scheduled.style = "display:none;";
    }
  }

}, { passive: true } );