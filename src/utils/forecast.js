const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=36ffe392fcd8e1f8bfca1af081d3319e&query=${latitude},${longitude}`
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services...')
        }else if(response.body.success===false){
            callback('Try new searching again..')
        }else{
            callback(error,{
                // location:response.body.location.name,
                temp:response.body.current.temperature,
                weather:response.body.current.weather_descriptions[0],
                feelslike:response.body.current.feelslike,
                time:response.body.location.localtime,
                is_day:response.body.current.is_day
            })
        }

    })
}

module.exports=forecast