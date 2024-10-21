let url = "https://api.wheretheiss.at/v1/satellites/25544"; // url to where the iss is

// set the id iss-lat and iss-long from HTML
let issLat = document.querySelector("#iss-lat");
let issLong = document.querySelector("#iss-long");

let issMarker; // leaflet marker
let update = 10000; // 10 seconds
let issIcon = L.icon({
  iconUrl: 'iss_icon.png',
  iconSize: [50, 50], // array of 2 elements: height and width
  iconAnchor: [25, 25]
})

let timeISSLocationFetched = document.querySelector('#time')

let map = L.map("iss-map").setView([0, 0], 1); // Center at 0, 0 and max out zoom
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 7,
  id: "mapbox.streets",
}).addTo(map);

iss(); // initial call to function
setInterval(iss, update); // Call the iss function every update seconds

function iss() {
  fetch(url) // returns a promise (js object that promises it will provide data or reject data)
    .then((res) => res.json()) // returns response (res) from surver and translates into json
    .then((issData) => { //prosess the data 
      console.log(issData); // (log data from the server into the consol)
      let lat = issData.latitude;  // hold data for latitude from the server in lat
      let long = issData.longitude; // hold data for longitude from the server in long
      issLat.innerHTML = lat; // display latitude in html on the page
      issLong.innerHTML = long; // display longitude in html on the page

      if (!issMarker) {
        //creater marker
        issMarker = L.marker([lat, long], {icon: issIcon}).addTo(map); // add iss icon marker to the map using longitude and latutude 
      } else {
        issMarker.setLatLng([lat, long]); // already exists, move to new location
      }
      let now = Date()  // set the date to the current date 
      timeISSLocationFetched.innerHTML = `This data was fetched at ${now}` // display date in html on page
    })
    .catch((err) => { // if there is an error, catch it 
      console.log(err);
    });
}

