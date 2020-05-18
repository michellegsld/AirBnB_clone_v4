const articleTemplate = '<div class="title_box"><h2></h2><div class="price_by_night">$</div></div><div class="information"><div class="max_guest"> Guests</div><div class="number_rooms"> Bedrooms</div><div class="number_bathrooms"> Bathrooms</div></div><div class="user"><b>Owner: </b></div><div class="description"></div><DIV class="reviews"><H2></H2><SPAN>show</SPAN><UL></UL></DIV>';

window.onload = () => {
  const checkedStates = {};
  const checkedCities = {};
  const checkedAmenities = {};

  // Filter checks for States/Cities
  $('DIV.locations INPUT:checkbox').click(function () {
    if ($(this).prop('checked') === true) {
      if ($(this).hasClass('state') === true) {
        checkedStates[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        checkedCities[$(this).attr('data-id')] = $(this).attr('data-name');
      }
    } else {
      if ($(this).hasClass('state') === true) {
        delete checkedStates[$(this).attr('data-id')];
      } else {
        delete checkedCities[$(this).attr('data-id')];
      }
    }
    const names = $.map(Object.assign({}, checkedStates, checkedCities), (value, key) => { return value; });
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
    if ($(this).prop('checked') === true) {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmenities[($(this).attr('data-id'))];
    }
    const names = $.map(checkedAmenities, (value, key) => { return value; });
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
    const jsonIDs = { states: [], cities: [], amenities: [] };

    $.each(checkedStates, function (key) { jsonIDs.states.push(key); });
    $.each(checkedCities, function (key) { jsonIDs.cities.push(key); });
    $.each(checkedAmenities, function (key) { jsonIDs.amenities.push(key); });

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
    $(_id + ' DIV.title_box H2').text(place.name);

    // Get user names by id from API
    const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + place.user_id;
    $.getJSON(userUrl, function (user) {
      $(_id + ' .user').append(user.first_name + ' ' + user.last_name);
    });

    // Give SPAN and UL tag an attr that matches place.id
    $(_id + ' SPAN').attr('id', place.id);
    $(_id + ' UL').attr('id', place.id);
  }

  // Toggle show or hide Reviews
  $('SPAN').click(function () {
    // Retrieve id of element
    _id = $(this).attr('id');

    // To show the reviews
    if($(this).text().match('show')) {
      $(this).text('hide');
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/places/' + _id + "/reviews",
        success: (reviews) => {
          for (const review of reviews) {
            populatePlaceReviews(review, _id);
          }
        }
      });
    } else { // To hide the reviews
      $(this).text('show');
      $('UL #' + _id).empty();
    }
  });

  // Populate place-article with review
  function populatePlaceReview (review, _id) {
    // Get user's name associated with review for top bullet
    const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + review.user_id;
    $.getJSON(userUrl, function (user) {
      userName = user.first_name + ' ' + user.last_name;
    });

    // Create top bullet with title of review
    const titleLI = $('<LI></LI>').appendTo($('UL #' + _id));
    titleLI.text('<H3>From ' + userName + ' the ' + review.updated_at + '</H3>');

    // Create second bullet with text/summary of review
    const textLI = $('<LI></LI>').appendTo($('UL #' + _id));
    textLI.text('<P>' + review.text + '</P>');
  }
};
