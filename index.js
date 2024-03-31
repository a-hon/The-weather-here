const express = require('express')
const Datastore = require('nedb');
require('dotenv').config()
const app = express()
app.use(express.json({limit: '1mb'}))

app.listen(3000,() =>{console.log('listen')})

app.use(express.static('public'))
const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response)=>{
    console.log('Receiving data');
    const data = request.body
    console.log(data)
    const timeStamp =  Date.now()
    data.timeStamp = timeStamp
    database.insert(data)
    response.json(data)

})

app.get('/api', (request, response) =>{
    console.log('Sending data');
    database.find({}, (err, data) => {
        if(err){
            response.end()
            return;
        }
        response.send(data)
    })  
})




app.get('/weather/:latlon', async (request, response) =>{
    const latlon = request.params.latlon.split(',')
    console.log(latlon);
    const lat = latlon[0]
    const lon = latlon[1]
    const apiKey = process.env.APIKEY
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${apiKey}`
    const weatherResponse = await fetch(weatherUrl)
    const weatherData  = await weatherResponse.json()
   

   const AqUrl = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`
    const AqResponse = await fetch(AqUrl)
    const AqData  = await AqResponse.json()
     const data = {
        weather: weatherData,
        aq: AqData
     }
    response.json(data)

    


})



