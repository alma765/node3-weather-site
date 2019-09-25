const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather ',
        name: 'Ali Malik-Abbas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me ',
        name: 'Alibay Malik-Abbas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page ',
        body: 'Thuis is a definitive help message',
        title: 'Help',
        name: 'Alibay Malik-Abbas'
    })
})

app.get('/weather', (req, res) => {

    //console.log(req.query.address)


    if (!req.query.address) {

        return res.send({
            error: 'You must provide an address'

        })
    } else {
        // console.log('else')
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ error })
            }


            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })
            })
        })
    }

})


app.get('/products', (req, res) => {
    // req.query

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('error', {
        title: 'Error Page ',
        errMessage: 'Help article not found',
        name: 'Alibay Malik-Abbas'
    })

})



app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page ',
        errMessage: 'Page not found',
        name: 'Alibay Malik-Abbas'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
