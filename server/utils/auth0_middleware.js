const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
  domain: "dev-55i5fhx4.auth0.com",
  audience: "https://acnh-turnip-price-tracker.herokuapp.com"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-55i5fhx4.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

module.exports = checkJwt;