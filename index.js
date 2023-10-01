const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./src/utils/geocode')
const foreCast = require('./src/utils/foreCast')


const app = express()
// Define path to express config
const publicDirpath = path.join(__dirname,'./public')
const partialsPath = path.join(__dirname,'./templates/partials') 


// Set handlerbars to engine to serve
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'./templates/views'));
hbs.registerPartials(partialsPath)

// Set static directory to serve

app.use(express.static(publicDirpath))

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather ',
        name : 'Gaurav'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Gaurav Sharma'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help',
        name : 'Gaurav',
        contact : 'For more help'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'No address'
        })
    }



    // console.log(req.q.address)

    geocode(req.query.address, (error, {lat, long} = {} ) => {
    if(error){
       return res.send({error})
    }
    else{
        foreCast(lat,long,'m', (error, data ) => {
            if(error){
                return res.send({error})
            }
            else{
                res.send({
                    location : data.location,
                    temperature : data.temp,
                    units : data.units
        
                })
            }
        })
    }
    })

})


app.get('/help/*', (req,res) => {
    res.render('error', {
        title : 'Error 404',
        name : 'Gaurav',
        errorMessage : 'Help article not found'
    })
})

app.get('*' , (req,res) => {
    res.render('error', {
        title : 'Error 404',
        name : 'Gaurav',
        errorMessage : 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})