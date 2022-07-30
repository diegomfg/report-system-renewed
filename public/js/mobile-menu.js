$('#menu-icon').on('click', (event) => {
  event.preventDefault();
  let menu = $('#mobile-menu')
  menu.toggleClass('hidden')
})