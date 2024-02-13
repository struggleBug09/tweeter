//Adds hovered class when hovering to change favicon color
$(document).ready(function () {
  $(document).on('mouseenter', '.favicon i', function () {
    $(this).addClass('hovered');
  }).on('mouseleave', '.favicon i', function () {
    $(this).removeClass('hovered');
  });
});

//Adds shadow when hovering over tweets
$(document).ready(function () {
  $(document).on('mouseenter', '.tweet', function () {
    $(this).css('box-shadow', '12px 12px 1px 0px #c5ccf0');
  }).on('mouseleave', '.tweet', function () {
    $(this).css('box-shadow', 'none');
  });
});
