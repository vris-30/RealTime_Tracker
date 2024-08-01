const socket = io();

// check if the browser supports geo location
// and use watch position to tract the users location continously.

if(navigator.geolocation){
	navigator.geolocation.watchPosition((position)=>{
		const {latitiude, longitude} = position.coords;
		socket.emit("send-location", {latitude , longitude});
}, (error)=>{
	console.error(error);
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
})