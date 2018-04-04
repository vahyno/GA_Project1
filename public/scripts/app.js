console.log('sanity check')// wait for the DOM to finish loading

$(document).ready(function() {
  console.log('document ready');
  // all code to manipulate the DOM goes inside this function
  $.ajax({
    method: 'GET',
    url: '/api/people',
    success: handleSuccess,
    error: handleError
  });

  // handleSuccess(test_people)


}); // doc ready ends here



// function initMaps(indx) {
//   var map = new google.maps.Map(document.getElementById(`map-${indx}`), {
//     zoom: 14,
//     center: {lat: 37.78, lng: -122.44}
//   });
//   var geocoder = new google.maps.Geocoder();
//
//   document.getElementById('submitButton').addEventListener('click', function(event) {
//     event.preventDefault();
//     geocodeAddress(geocoder, map);
//   });
// }
//
// function geocodeAddress(geocoder, resultsMap) {
//   var address = document.getElementById('address').value;
//   console.log(address);
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

// var test_people = [{
//   id: 123,
//   name: 'teddy',
//   yearOfBirth: 1976,
//   address: 'prague'
// },
// {
//   id: 124,
//   name: 'bear',
//   yearOfBirth: 1955,
//   address: 'berlin'
// },
// {
//   id: 125,
//   name: 'koala',
//   yearOfBirth: 1960,
//   address: '255 bush street'
// },{
//   id: 126,
//   name: 'monkey',
//   yearOfBirth: 1974,
//   address: 'oakland'
// },
// {
//   id: 127,
//   name: 'huuhu',
//   yearOfBirth: 1900,
//   address: 'madrid'
// },
// {
//   id: 128,
//   name: 'baba',
//   yearOfBirth: 2000,
//   address: 'san rafael, california'
// }];


function handleSuccess(people) {
    people.forEach(function(person) {
      renderPerson(person);
    });
};

function handleError(err){
  console.log('There has been an error: ', err);
}

function renderPerson(mapPerson){
  console.log('rendering individual', mapPerson);
  var age = new Date().getFullYear() - parseInt(mapPerson.yearOfBirth);

  $('#map-container').append(`
      <div id="map-${mapPerson._id}" style="height:50%;width:50%;"></div

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${mapPerson.name}</h5>
          <p class="card-text"> card</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <hr>
    `);

    let address = mapPerson.address;
    var map = new google.maps.Map(document.getElementById(`map-${mapPerson._id}`),
    {
      zoom: 14,
      center: {lat: 37.78, lng: -122.44}
    });
    var geocoder = new google.maps.Geocoder();
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
