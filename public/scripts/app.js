console.log('sanity check')// wait for the DOM to finish loading

$(document).ready(function() {
  console.log('document ready');
  // all code to manipulate the DOM goes inside this function

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 37.78, lng: -122.44}
      });
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
      });
    }

    function geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('address').value;
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

    initMap();






}); // doc ready ends here
