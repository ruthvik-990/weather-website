
    


const form=document.getElementById('form')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('testing')
    const address=e.target.address.value
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            document.getElementById('message1').innerHTML=`<h2 class="text-danger"><b>${data.error}</b></h2>`
            document.getElementById('message2').innerHTML=""
            document.getElementById('show').style.backgroundImage="none"
        }
        else{
            document.getElementById('message1').innerHTML=`<h3 class="text-white">Location : ${data.location}</h3>`
            document.getElementById('message2').innerHTML=`
                <div class="container row text-white font-weight-bold mb-3">
                    <div class="col border-white border-right">Latitude : ${data.latitude}<br>
                    Longitude : ${data.longitude}<br>
                    LocalTime : ${data.time}
                    </div>

                    <div class="col">
                    Temperature : ${data.temperature}°C<br>
                    Weather : ${data.weather}<br>
                    FeelsLike : ${data.opinion}°C<br>
                    </div>
            
                </div>
            `
            
            if(data.is_day=="no"){
                document.getElementById('show').style.backgroundImage="url('/images/night.jpg')"
                
            }
            else{
                document.getElementById('show').style.backgroundImage="url('/images/day.jpg')"
                
            }
        }
    })
    .catch(error=>console.log(error))
})


