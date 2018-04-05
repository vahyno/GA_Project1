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

  $('#map-container').on('click', '.delete-button', function(){
    // console.log($(this));
    var current_id = $(this).data("id")
    console.log(current_id);

    $.ajax({
      method:'DELETE',
      url: `/api/people/${current_id}`,
      success: function() {
        console.log(current_id + " was deleted!");
      },
      error: handleError,

    })
  })



}); // doc ready ends here

function handlePostSuccess(people) {
  console.log(people);
  renderPerson(people);
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

  let location = mapPerson.mapLocation;
  // console.log(location);

  let address = "";
  if (location.streetAddress !== ""){
    address += `${location.streetAddress}, `
  }
  if (location.city !== ""){
    address += `${location.city}, `
  }
  if (location.zipcode !== ""){
    address += `${location.zipcode}, `
  }
  address += location.country;



  $('#map-container').append(`
      <div id="map-${mapPerson._id}" style="height:50%;width:50%;"></div

          <div class="col-md-9 col-xs-12">
            <div class="container">
              <div class="item">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Name:</h4>
                    <span class='player-name' style="text-transform: capitalize">${ mapPerson.name }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Gender:</h4>
                    <span class='player-height' style="text-transform: capitalize">${ mapPerson.gender }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Age:</h4>
                    <span class='player-age'>${ age }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Location:</h4>
                    <span style="text-transform: capitalize">${ address }</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <button class="update-button" name="submitButton" class="btn btn-dark">Update</button>
              <button data-id="${ mapPerson._id }" class="delete-button" name="submitButton" class="btn btn-dark">Delete</button>
            </div>
          </div>
      <hr>
    `);

    // <div class="item" class="btn btn-outline-secondary">
    //   <button class="btn btn-outline-secondary" type="submit">Update</button>
    //   <button class="btn btn-outline-secondary" type="submit">Delete</button>
    // </div>



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
