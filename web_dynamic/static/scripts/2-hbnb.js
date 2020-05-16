window.onload = () => {
  const checked = {};

  $('INPUT:checkbox').click(function () {
    console.log('Inside input block');
    if ($(this).prop('checked') === true) {
      checked[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checked[($(this).attr('data-id'))];
    }
    const names = $.map(checked, (value, key) => { return value; });
    let formattedString = '';
    for (let i = 0; i < names.length; i++) {
      formattedString += names[i];
      if (i < names.length - 1) {
        formattedString += ', ';
      }
    }
    formattedString += '&nbsp;';
    $('DIV.amenities H4').html(formattedString);
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
};
