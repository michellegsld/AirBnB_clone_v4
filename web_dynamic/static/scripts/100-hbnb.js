const articleTemplate = '<div class="title_box"><h2></h2><div class="price_by_night">$</div></div><div class="information"><div class="max_guest"> Guests</div><div class="number_rooms"> Bedrooms</div><div class="number_bathrooms"> Bathrooms</div></div><div class="user"><b>Owner: </b></div><div class="description"></div>';

window.onload = () => {
  const checked = {};

  // Filter checks for States/Cities
  $('DIV.locations INPUT:checkbox').click(function () {
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
    $('DIV.locations H4').html(formattedString);
  });

  // Filter checks for Amenities
  $('DIV.amenities INPUT:checkbox').click(function () {
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

  // API status request
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  // All places request
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: (places) => {
      console.log(places.length);
      for (const place of places) {
        populatePlaceArticle(place);
      }
    },
    error: () => {
      console.log('Error making POST to places_search');
    }
  });

  // Filtered place request
  $('BUTTON:button').click(function () {
    // Created list of id's from dictionary of checked states, cities, and amenities
    const jsonIDs = {'states': [], 'cities': [], 'amenities': []};

    $.each(checked, function (key) {
      if ($('DIV.amenities').contains(key)) {
        jsonIDs['amenities'].push(key);
      } else if ($('DIV.locations H2').contains(key)) {
        jsonIDs['states'].push(key);
      } else {
        jsonIDs['cities'].push(key);
      }
    });

    // Clear current places displayed
    $('SECTION.places').empty();

    // Make request with amenity filters
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(jsonIDs),
      success: (places) => {
        for (const place of places) {
          populatePlaceArticle(place);
        }
      }
    });
  });

  function populatePlaceArticle (place) {
    // Create new place article template
    let _id = place.id;
    const newArt = $('<article></article>').appendTo($('SECTION.places'));
    newArt.attr('id', _id);
    newArt.append(articleTemplate);
    _id = '#' + _id;

    // Loop through attrs of place object and assign values
    // to elements with matching classnames
    $.each(place, function (key, val) {
      if (key === 'price_by_night') {
        $(_id + ' .' + key).append(val);
      } else {
        $(_id + ' .' + key).prepend(val);
      }
    });

    // Manually assign values to elements without class names
    // matching place object attr names
    $(_id + ' H2').text(place.name);

    // Get user names by id from API
    const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + place.user_id;
    $.getJSON(userUrl, function (user) {
      $(_id + ' .user').append(user.first_name + ' ' + user.last_name);
    });
  }
};
