const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log('dirname', __dirname)
// console.log('filename', path.join(__dirname, '../public'))

const app = express()
// Get port on heroku else use statically defined port
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // default is root/views
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


//would never run as now root route will be displayed with index.html(its a special file)
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
app.get('', (req, res) => {
    //use render instead of send to render hbs, arg should be the name of the file (here index)
    res.render('index', {
        title: 'Weather',
        name: 'Rishabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rishabh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        // forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            // console.log(geoData.location)
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Need a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Rishabh'
    })
})

// Should always be last as it will match anything and always end up with 404 page
// Express matches route in the order they are declared starting from app.use!(i.e. the public folder)


// Catch all non-existing help pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Rishabh',
        errorMessage: 'Help article not found'
    })
})

// Catch all non-existing pages
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rishabh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})

