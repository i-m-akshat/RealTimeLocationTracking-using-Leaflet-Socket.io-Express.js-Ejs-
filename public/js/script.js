
const socket=io();
console.log('hey');
//if browser supports geolocation
if(navigator.geolocation){
    //getting position
    navigator.geolocation.watchPosition(
        (position)=>{
           const {latitude,longitude} =position.coords;
           socket.emit("send-location",{latitude,longitude})
    },
    (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:5000,
    }
)
}
//leaflet code
const map=  L.map("map").setView([0,0],22   );
L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,{
    attribution:"Akshat Dwivedi",
}).addTo(map);

const markers={};

socket.on('receive-location',(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLetLang([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
})
socket.on("user-disconnected",(id)=>{
        if(markers[id]){
            map.removeLayer(markers[id]);
            delete markers[id];
        }
})