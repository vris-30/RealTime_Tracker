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
 