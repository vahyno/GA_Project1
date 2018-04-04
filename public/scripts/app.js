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

  $('#personData-form').on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    this.reset();

    $.ajax({
      method: 'POST',
      url: '/api/people',
      data: formData,
      success: handlePostSuccess,
      error: handleError
    });
  });



}); // doc ready ends here

function handlePostSuccess(people) {
  console.log(people);
  renderPerson(person);
};


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

    let address = "";
    if (mapPerson.streetAddress !== ""){
      address += `${mapPerson.streetAddress}, `
    }
    if (mapPerson.city !== ""){
      address += `${mapPerson.city}, `
    }
    if (mapPerson.zipcode !== ""){
      address += `${mapPerson.zipcode}, `
    }
    address += mapPerson.country;

    mapPerson.address;
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
