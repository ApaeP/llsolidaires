import GMaps from "gmaps/gmaps.js";
export { initAutocomplete };

require("google-maps");

const initAutocomplete = () => {
  const map = new GMaps({
    el: "#map",
    lat: localStorage.getItem("lat") ? localStorage.getItem("lat") : 48.8534,
    lng: localStorage.getItem("lng") ? localStorage.getItem("lng") : 2.3488,
    zoom: 11
  });
  search(map);
};

const search = map => {
  // Create the search box and link it to the UI element.
  var input = document.getElementById("SearchBar");
  var searchBox = new google.maps.places.SearchBox(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  let query;
  let lat;
  let lng;
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    query = places[0].formatted_address;
    lat = places[0].geometry.location.lat();
    lng = places[0].geometry.location.lng();

    localStorage.setItem("lat", lat);
    localStorage.setItem("lng", lng);
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    let target = document.getElementById("SearchBar");
    let lat_hidden_field = document.getElementById("hidden_lat");
    let lng_hidden_field = document.getElementById("hidden_lng");
    lat_hidden_field.setAttribute("value", lat);
    lng_hidden_field.setAttribute("value", lng);
    target.addEventListener("submit", e => {
      e.removeAttribute("value");
      e.setAttribute("value", query);
    });
    //document.getElementById('search-bar-button').click();
  });
  let flats = document.getElementById("map").getAttribute("data-markers");
  if (flats && flats != "[]") {
    flats = flats.replace("[", "");
    flats = flats.replace("]", "");
    flats = flats.split(/(?=\{)/);
    $.each(flats, function(index, value) {
      let json = JSON.parse(value.replace(/,*$/, ""));
      map.addMarker({
        lat: json.lat,
        lng: json.lng
      });
    });
  };
};



// Markers from PP
  // const markers_de_ouf = JSON.parse(document.getElementById('map').dataset.markers);
  // console.log(markers_de_ouf)
  // markers_de_ouf.forEach((marker) => {
  //   map.addMarker({
  //     lat: marker.lat,
  //     lng: marker.lng,
  //     infoWindow: {
  //       content: `<div><h4>${marker.address.toString()}</h4><p>type d'appartement : ${marker.type.toString()}</p><p>distance : ${marker.distance.toString()} km</p></div>`
  //     }
  //   });
  // });
// Markers from PP

// import GMaps from "gmaps/gmaps.js";
// export { initAutocomplete };
// require("google-maps");
// const initAutocomplete = () => {
//   const map = new GMaps({
//     el: "#map",
//     lat: localStorage.getItem("lat") ? localStorage.getItem("lat") : 48.8534,
//     lng: localStorage.getItem("lng") ? localStorage.getItem("lng") : 2.3488,
//     zoom: 10
//   });
//   search(map);
// };
// const search = map => {
//   // Create the search box and link it to the UI element.
//   var input = document.getElementById("SearchBar");
//   var searchBox = new google.maps.places.SearchBox(input);
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener("bounds_changed", function() {
//     searchBox.setBounds(map.getBounds());
//   });
//   var markers = [];
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   let query;
//   let lat;
//   let lng;
//   searchBox.addListener("places_changed", function() {
//     var places = searchBox.getPlaces();
//     if (places.length == 0) {
//       return;
//     }
//     query = places[0].formatted_address;
//     lat = places[0].geometry.location.lat();
//     lng = places[0].geometry.location.lng();

//     localStorage.setItem("lat", lat);
//     localStorage.setItem("lng", lng);
//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];
//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };
//       // Create a marker for each place.
//       markers.push(
//         new google.maps.Marker({
//           map: map,
//           icon: icon,
//           title: place.name,
//           position: place.geometry.location
//         })
//       );
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//     let target = document.getElementById("SearchBar");
//     let lat_hidden_field = document.getElementById("hidden_lat");
//     let lng_hidden_field = document.getElementById("hidden_lng");
//     lat_hidden_field.setAttribute("value", lat);
//     lng_hidden_field.setAttribute("value", lng);
//     target.addEventListener("submit", e => {
//       e.removeAttribute("value");
//       e.setAttribute("value", query);
//     });
//     //document.getElementById('search-bar-button').click();
//   });
//   let flats = document.getElementById("map").getAttribute("data-markers");
//   if (flats && flats != "[]") {
//     console.log("Je suis dans le flat");
//     flats = flats.replace("[", "");
//     flats = flats.replace("]", "");
//     flats = flats.split(/(?=\{)/);
//     $.each(flats, function(index, value) {
//       let json = JSON.parse(value.replace(/,*$/, ""));
//       console.log(json);
//       map.addMarker({
//         lat: json.lat,
//         lng: json.lng
//       });
//       localStorage.setItem("lat", json.lat);
//       localStorage.setItem("lng", json.lng);
//     });
//   }
// };
// const search2 = map => {
//   // Create the search box and link it to the UI element.
//   var input = document.getElementById("SearchBar");
//   var searchBox = new google.maps.places.SearchBox(input);
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener("bounds_changed", function() {
//     searchBox.setBounds(map.getBounds());
//   });
//   var markers = [];
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   let query;
//   let lat;
//   let lng;
//   searchBox.addListener("places_changed", function() {
//     var places = searchBox.getPlaces();
//     if (places.length == 0) {
//       return;
//     }
//     query = places[0].formatted_address;
//     lat = places[0].geometry.location.lat();
//     lng = places[0].geometry.location.lng();
//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];
//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };
//       // Create a marker for each place.
//       markers.push(
//         new google.maps.Marker({
//           map: map,
//           icon: icon,
//           title: place.name,
//           position: place.geometry.location
//         })
//       );
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//     let target = document.getElementById("SearchBar");
//     let lat_hidden_field = document.getElementById("hidden_lat");
//     let lng_hidden_field = document.getElementById("hidden_lng");
//     lat_hidden_field.setAttribute("value", lat);
//     lng_hidden_field.setAttribute("value", lng);
//     target.addEventListener("submit", e => {
//       e.removeAttribute("value");
//       e.setAttribute("value", query);
//     });
//     //document.getElementById('search-bar-button').click();
//   });
//   let flats = document.getElementById("map").getAttribute("data-markers");
//   if (flats && flats != "[]") {
//     console.log("Je suis dans le flat");
//     flats = flats.replace("[", "");
//     flats = flats.replace("]", "");
//     flats = flats.split(/(?=\{)/);
//     $.each(flats, function(index, value) {
//       let json = JSON.parse(value.replace(/,*$/, ""));
//       console.log(json);
//       map.addMarker({
//         lat: json.lat,
//         lng: json.lng
//       });
//     });
//   }
// };
