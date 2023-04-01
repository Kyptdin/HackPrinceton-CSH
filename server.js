// // User and client//
// import express from "express";

// const PORT= 5500; // the local server;
// const app= express();
 
// app.listen(PORT, () => {
//     console.log("server is started")
// })

// app.use(express.static ('./')); // SAFI ADD THE FOLDER NAME WITH THE CSS and htlm here 

// app.get('/', (req,res ) =>{
//     res.sendFile("") // Put the HTML FILE HERE ex " index.html"
 
// })
import express from "express";
import { Server } from "socket.io";

const PORT = 5500;
const app = express();
const options = {
    cors: true,
    origin: ['http://localhost:5500/'] // the local 
}

const server = app.listen(PORT, () => {
    console.log('server is started')
})

const io = new Server(server, options);

app.use(express.static('./dist')); // SAFI ADD THE FOLDER NAME WITH THE CSS and htlm here Ex ./foldername

app.get('/', (req, res) => {
    res.sendFile(""); // Put the HTML FILE HERE ex " index.html"
})

io.on("connection", socket => {
    socket.emit('welcome', socket.id)
    socket.join('room1');
    socket.on('message', message => {
        io.to("room1").emit('receiveMessage', {
            userId: socket.id,
            message: message
        })
    })
})




