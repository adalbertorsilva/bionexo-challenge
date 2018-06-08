const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/v1/find_ubs', (req, res) => {
    res.status(200).send('RESPONDI !!!!')
})

module.exports = app