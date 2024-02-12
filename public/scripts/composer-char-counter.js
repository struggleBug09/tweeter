$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charactersLeft = 140 - $(this).val().length;
    $('.counter').text(charactersLeft);
    if (charactersLeft < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', ''); 
    }
  });
});
