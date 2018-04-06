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
      success: (data) => {
        console.log(current_id + " was deleted!");
        $(`.map-${current_id}`).remove();
      },
      error: handleError,

    })
  })

  $('#map-container').on('click', '.update-button', function(){
    // console.log($(this));
    var current_id = $(this).data("id")
    console.log(current_id);

    $.ajax({
      method:'GET',
      url: `/api/people/${current_id}`,
      success: (data) => {
        console.log(`get data for user=${current_id}`);
        console.log(data);
        populateForm(data);
        //$(`.map-${current_id}`).remove();
      },
      error: handleError,
    })
  })


}); // doc ready ends here



function handlePostSuccess(people) {
  console.log(people);
  renderPerson(people);
};

function populateForm(person){
  $('#modal-name').val(person.name);
  $('#modal-gender').val(person.gender);
  $('#modal-yearOfBirth').val(person.yearOfBirth);
  $('#modal-streetAddress').val(person.mapLocation.streetAddress);
  $('#modal-city').val(person.mapLocation.city);
  $('#modal-zipcode').val(person.mapLocation.zipcode);
  $('#modal-country').val(person.mapLocation.country);
}

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

          <div class="col map-${mapPerson._id}">
          <div id="map-${mapPerson._id}" class="map-${mapPerson._id} mapo" style="height:23em;width:33em;"></div>

            <div class="container ">
            <div class="row personInfo">

            <div class="col grid">
              <div class="item">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Name:</h4>
                    <span class='person-name' style="text-transform: capitalize">${ mapPerson.name }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Gender:</h4>
                    <span class='person-gender' style="text-transform: capitalize">${ mapPerson.gender }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Age:</h4>
                    <span class='person-age'>${ age }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Location:</h4>
                    <span style="text-transform: capitalize">${ address }</span>
                  </li>
                </ul>
                <button data-id="${ mapPerson._id }" class="delete-button" name="submitButton" class="btn btn-dark">Delete</button>
                <!-- Button trigger modal -->
                <button data-id="${ mapPerson._id }"
                  class="update-button"
                  name="submitButton"
                  class="btn btn-dark"
                  data-toggle="modal"
                  data-target="#exampleModal">Update</button>
              </div>
            </div>
            </div>
          </div>
    `);




    mapPerson.address;
    var map = new google.maps.Map(document.getElementById(`map-${mapPerson._id}`),
    {
      zoom: 13,
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
