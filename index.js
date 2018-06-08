const app = require('./config/app')
const csv=require('csvtojson')
const PORT = parseInt(process.env.PORT, 10) || 3000
app.set('port', PORT)

app.listen(PORT)

console.log(`-------------------------------------  Server up on port ${PORT} -------------------------------------`)
