
const handle404 = (req, res) => {
  res.status(404).send("unsupported endpoint")
}

const handleGeneralError = (err, req, res, next) => {
  res.status(500).send(`General Error: ${err}`)
}
module.exports = {
  handle404,
  handleGeneralError
}