const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000
// Static files path for express
const publicDirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setting hbs 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setting up static file to use
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'GetWeather',
        name:'Ruthvik'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather',
        name:'Ruthvik'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is the important message plz dont share this with anyone ok alrigth then lest get this party started.'
        
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please send an address'
        })

    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,{temp,weather,feelslike,time,is_day}={})=>{
            if (error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                temperature:temp,
                weather:weather,
                opinion:feelslike,
                latitude:latitude,
                longitude:longitude,
                time:time,
                is_day:is_day
            })
        })
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorName:'404 not Found',
        message:'Help page requested not found plz check the url..'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorName:'404 not found',
        message:'The requested url not found plz check the url..'
    })
})



app.listen(port,()=>{
    console.log('Server started at port '+port)
})