const app = require('./server/app')
const PORT = parseInt(process.env.PORT, 10) || 3000
const seeder = require('./seeders/20180609032612-create-ubs-geocode-scores')
app.set('port', PORT)

app.listen(PORT)

console.log(`-------------------------------------  Server up on port ${PORT} -------------------------------------`)

seeder.up()
  .then(data => {
    console.log('SEED FINISHED !!!!')
  })
