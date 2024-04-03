function initMap() {
    // Centre point of the base map, (currently California)
    var start = {
      lat: 36.7783,
      lng: 119.4179
    };
    var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 4,
        center: start
      });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
      position: start,
      map: map
    });
  }
