console.log('sanity check')// wait for the DOM to finish loading

$(document).ready(function() {
  console.log('document ready');
  // all code to manipulate the DOM goes inside this function
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/',
  //   success: handleSuccess,
  //   error: handleError
  // });

  handleSuccess(test_people)


}); // doc ready ends here



function initMaps(indx) {
  var map = new google.maps.Map(document.getElementById(`map-${indx}`), {
    zoom: 14,
    center: {lat: 37.78, lng: -122.44}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('zipcode').value;
  console.log(address);
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

var test_people = [{
  id: 123,
  name: 'teddy',
  yearOfBirth: 1976,
  zipcode: 'liverpool'
},
{
  id: 124,
  name: 'bear',
  yearOfBirth: 1955,
  zipcode: '95008'
},
{
  id: 125,
  name: 'koala',
  yearOfBirth: 1970,
  zipcode: '255 bush street'
}];
