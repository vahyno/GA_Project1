console.log('sanity check')// wait for the DOM to finish loading

$(document).ready(function() {
  console.log('document ready');
  // all code to manipulate the DOM goes inside this function
    var container=$('#map-container');

    // let indx = 1;


    container.append(`
      <div id="map-${1}" style="height:50%;width:50%;"></div

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text"> card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <hr>
    `);
    initMaps(1);

    container.append(`
      <div id="map-${2}" style="height:50%;width:50%;"></div

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text"> card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <hr>
    `);
    initMaps(2);








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
