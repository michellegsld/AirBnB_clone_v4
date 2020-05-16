const articleTemplate = '<div class="title_box"><h2></h2><div class="price_by_night"></div></div><div class="information"><div class="max_guest"></div><div class="number_rooms"></div><div class="number_bathrooms"></div></div><div class="user"><b>Owner:</b></div><div class="description"></div>'

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

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: (places) => {
      console.log(places);
      for (const place of places) {
		let _id = place.id;
        console.log('In for loop');
        let newArt = $('<article></article>').appendTo($('SECTION.places'));
        newArt.attr('id', _id);
        newArt.append(articleTemplate);
		_id = '#' + _id;
		$.each(place, function (key, val) {
			$(_id + ' .' + key).text(val);
        });
        $(_id + ' H2').text(place.name);
        $(_id + ' .user').append(place.user.first_name + ' ' + place.user.last_name);
      }
    },
    error: () => {
      console.log('Error making POST to places_search');
    }
  });
};
