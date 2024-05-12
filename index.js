const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the directory for EJS views

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

// Route for rendering the EJS template
app.get("/", (req, res) => {
  res.render("index"); // Render the 'index.ejs' file in the 'views' directory
});


const port = 9000
server.listen(port, () => {
  console.log(`Server Started at PORT: ${port} \nhttp://localhost:${port}`);
});