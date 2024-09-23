document.addEventListener( 'DOMContentLoaded', () => {
  const target = document.getElementById( 'page-top' );

  if ( target !== null ) {
    target.addEventListener( 'click', () => {
      window.scrollTo( {
        top: 0,
        behavior: "smooth"
      } );
    }, { passive: true } );
  }
}, { passive: true } );