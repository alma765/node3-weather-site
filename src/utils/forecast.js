const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const key = 'd9ce6ec78b3fe59018019eb00e820f40'
    const url = 'https://api.darksky.net/forecast/' + key + '/' + + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.' +
                ' With humidity of  ' + body.currently.humidity * 100 + '%')

        }
    })
}

module.exports = forecast