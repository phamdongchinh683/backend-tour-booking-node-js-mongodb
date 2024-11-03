const _tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const _tokenLife = process.env.ACCESS_TOKEN_LIFE;
const _url = process.env.DB_URL;
const _dbName = process.env.DB_NAME;
const _mailHost = process.env.MAIL_HOST;
const _mailUser = process.env.MAIL_USER;
const _mailPass = process.env.MAIL_PASS;

module.exports = {
  _tokenLife,
  _tokenSecret,
  _url,
  _dbName,
  _mailHost,
  _mailUser,
  _mailPass,
};
