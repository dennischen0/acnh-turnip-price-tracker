const apiServer = process.env.NODE_ENV === 'production' ? `https://acnh-turnip-price-tracker.herokuapp.com` : `http://localhost:8080`;

module.exports = Object.freeze({
  API_SERVER: apiServer
});