const request = require('request')

const geocode = (address, callback) => {
    const token = 'pk.eyJ1IjoiYWxtYTc2NSIsImEiOiJjazBidXdsejAwMDZoM25yajZ6ZmtoejlyIn0.osIkzW_Kol4Q5n_MVMV4Yw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + encodeURIComponent(token) + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode