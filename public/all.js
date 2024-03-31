
var map = L.map('map').setView([0, 0], 1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



async function getData(){
    const response = await fetch('/api')
    data = await response.json()
    console.log(data)
    
    for(item of data){
    const weather = ((item.wth.temp - 32) * .5556).toFixed(2)
       const marker = L.marker([item.lat, item.lon]).addTo(map);
      let txt =  `The weather here at ${item.lat}°, ${item.lon}° is ${item.wth.conditions} with a temperature of ${weather}°C. `
       if(item.air.value === -1){
            txt+= '  No air quality reading available.'
       }
       else{
        txt+= `  The AQI is ${item.air.value}`
       }
       marker.bindPopup(txt)

    }
}

getData()