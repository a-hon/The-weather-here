console.log('calculating position')
    navigator.geolocation.getCurrentPosition( async position => { 
let lat, lon, wth, air, timezone
        try{
         lat = position.coords.latitude.toFixed(2)
          lon = position.coords.longitude.toFixed(2)
         console.log(lat, lon)
        
         document.getElementById('lat').textContent = lat
         document.getElementById('lon').textContent = lon

        //  const apiURl = `weather/${lat}&lon=${lon}&appid=${apiKey}`
         const apiurl = `/weather/${lat},${lon}`
         const response = await fetch(apiurl)
         const data  = await response.json()
         console.log(data);
          wth = data.weather.currentConditions
          document.getElementById('summary').textContent = wth.conditions
          tempinF = wth.temp
          tempinC = ((tempinF - 32) * .5556).toFixed(2)
         document.getElementById('temperature').textContent = tempinC + '°C'
         timezone = data.weather.timezone
         console.log(timezone) 
         document.getElementById('timezone').textContent = timezone

         air = data.aq.results[0].measurements[0]
        //  console.log(aq)
         console.log(data)
         document.getElementById('ppm').textContent = air.value + 'PPM'
         
        
        }
        catch(error){
           air =  { value: -1 }
            document.getElementById('ppm').textContent = 'No reading'
        }

        const button = document.getElementById('submit')
        button.addEventListener('click', async event =>{
            console.log('sending info to databse')
        const data = {lat, lon, wth, air }
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
         }
         const db_response = await fetch('/api', options)
         const db_data = await db_response.json()
         console.log(db_data);



}) 

     })     







