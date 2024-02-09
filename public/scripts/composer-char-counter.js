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

$(document).ready(function() {
  $('#favicon i').hover(function() {
      $(this).addClass('hovered');
    },
    function() {
      $(this).removeClass('hovered');
    }
  );
});

$(document).ready(function() {
  $('.tweet-container').hover(function() {
    $(this).css('box-shadow', '12px 12px 1px 0px #c5ccf0');
  }, function() {
    $(this).css('box-shadow', 'none');
  });
});
