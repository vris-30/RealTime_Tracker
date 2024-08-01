const express = require('express');
const app = express();
const path = require("path");

const http = require("http");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
	socket.on("send-locaion", function(data){
		io.emit("receive-loction", {id:socket.id, ...data});
	});
	console.log("we are connected to socket");
})

app.get("/", function (req, res){
	res.render("index");
});

server.listen(3000);