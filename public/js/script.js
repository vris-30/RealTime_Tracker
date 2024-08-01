const socket = io();

// check if the browser supports geo location
// and use watch position to tract the users location continously.

if(navigator.geolocation){
	navigator.geolocation.watchPosition(
		(position)=>{
		const {latitiude, longitude} = position.coords;
		socket.emit("send-location", {latitude , longitude});
}, (error)=>{
	console.log(error);
},

// set options for high accuracy, 
// a 5-second timeout, and no caching.
{
	enableHighAccuracy: true,
	timeout:5000,
	maximumAge: 0
}
);
}
else {
    console.log("Geolocation is not supported by this browser.");
}

const map = L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
	attribution:"OpenStreetMap"
}).addTo(map)

const markers ={};

socket.on("receive-location", (data)=>{
	const{id, latitude, longitude} = data;
	map.setView([latitude,longitude]);
	if(markers[id]){
		markers[id].setLatLng([latitude,longitude]);
	}
	else{
		markers[id] = L.marker([latitude,longitude]).addTo(map);
	}
});

// remove markers when users disconnect
socket.on("user-disconnected", (id) =>{
	if(markers[id]){
		map.removeLayer(markers[id]);
		delete markers[id];
	}
});