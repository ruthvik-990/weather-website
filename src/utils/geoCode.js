const request=require('request')

const geoCode = (address,callback)=>{
    const geoCodeUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnV0aHZpazk5MCIsImEiOiJja2N1bHphMWcxMG42MnpvNGNid3NpM2JsIn0.tZTq7XrpB0FHVfvZWNa98Q&limit=1`

    request({url:geoCodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services...')
        }else if(response.body.features.length==0){
            callback('Unable to find location.Try another search.')
        }else{
            callback(error,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode