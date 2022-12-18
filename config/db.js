const mongoose = require('mongoose')

const db = mongoose.connection

mongoose.connect(process.env.MONGO_URI)

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})