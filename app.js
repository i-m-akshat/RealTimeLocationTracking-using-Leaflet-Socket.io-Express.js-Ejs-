const express=require('express')
const app=express();

//socket io setup 
const http=require('http');
const path = require('path');
const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);
//


//setting up view engine /ejs 

app.set("view engine","ejs");

//setting up static files 
// app.set(express.static(path.join(__dirname,"public")));
app.use('/public', express.static('public'));

io.on("connection",function(socket){
    socket.on('send-location',function(data){
        io.emit('receive-location',{id:socket.id,...data});
    })
    socket.on("disconnect",()=>{
    io.emit('user-disconnected',socket.id)
    })
    console.log('connected ');
})


app.get('/',(req,res)=>{
res.render('index');
});
server.listen(3000);
