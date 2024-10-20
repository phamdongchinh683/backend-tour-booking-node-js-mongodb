const _tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const _tokenLife = process.env.ACCESS_TOKEN_LIFE;
const _url = process.env.DB_URL;
const _dbName = process.env.DB_NAME;

module.exports = { _tokenLife, _tokenSecret, _url, _dbName };
