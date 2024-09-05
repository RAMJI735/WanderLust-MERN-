
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: JSON.parse(coordinates), // starting position [lng, lat]
    // centre: Json.parse(listing.geoMetry.coordinates),
    zoom: 9 // starting zoom
});

// map marker
// console.log(JSON.parse(coordinates));
const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(JSON.parse(coordinates))
.addTo(map)
// popup
.setpopup(new mapboxgl.Popup({ offset:25}
        // .setLngLat(coordinates)
        // .setHTML(`<h4>${title}</h4><p>Exact Location Provided after Booking`)))
        .setHTML('<h1>Hello World!</h1>')))
        .addTo(map);
        

