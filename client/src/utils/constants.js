const apiPort = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;

module.exports = Object.freeze({
  API_SERVER: `http://localhost:${apiPort}`
});