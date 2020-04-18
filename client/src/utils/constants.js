module.exports = Object.freeze({
  API_SERVER: (process.env.NODE_ENV === 'production') ? '' : process.env.REACT_APP_API_SERVER
});