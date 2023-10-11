const express = require('express')
const app = express()
const errorHandlers = require('./src/libs/errors')
const routes = require('./src/routes')

app.use(routes)
app.use(errorHandlers.handle404)
app.use(errorHandlers.handleGeneralError)

app.listen(process.env.port, () => {
  console.log(`Server is listening on port ${process.env.port}`)
})
