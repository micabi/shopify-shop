document.addEventListener('DOMContentLoaded', () => {
  const tag = document.querySelector('.specExp');
  if(tag !== null) {
    // console.log(tag.children);
    for(let i = 0; i < tag.children.length; i++) {
      // console.log(tag.children[i]);
      if(tag.children[i].tagName === 'BR') {
        // console.log(i);
        tag.children[i].remove();
        // tag.children[1].remove();
      }
    }
  }
}, {passive: true});