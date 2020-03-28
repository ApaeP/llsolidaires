import GMaps from 'gmaps/gmaps.js';

const mapElement = document.getElementById('map');
if (mapElement) {
  const map = new GMaps({ el: '#map', lat: 0, lng: 0 });
  const markers = JSON.parse(mapElement.dataset.markers);
  map.addMarkers(markers);
  if (markers.length === 0) {
    map.setZoom(2);
  } else if (markers.length === 1) {
    map.setCenter(markers[0].lat, markers[0].lng);
    map.setZoom(14);
  } else {
    map.fitLatLngBounds(markers);
  }
}
  // Markers Hospitals
  const mapElement2 = document.getElementById('map');
  if (mapElement2) {
  const markersHosp = JSON.parse(mapElement2.dataset.markersHosp);
  map.addMarkers(markersHosp);
   if (markersHosp.length === 0) {
     map.setZoom(2);
   } else if (markersHosp.length === 1) {
     map.setCenter(markersHosp[0].lat, markersHosp[0].lng);
     map.setZoom(14);
   } else {
     map.fitLatLngBounds(markersHosp);
   }
}