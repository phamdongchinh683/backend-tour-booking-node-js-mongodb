const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

function checkPasswordStrength(password) {
  let strength = 0;
  let tips = "";
  if (password.length < 8) {
    tips += "Make the password longer. ";
  } else {
    strength += 1;
  }

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters. ";
  }

  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  if (strength < 2) {
    return { strength: "Easy to guess", tips: tips };
  } else if (strength === 2) {
    return { strength: "Medium difficulty", tips: tips };
  } else if (strength === 3) {
    return { strength: "Difficult", tips: tips };
  } else {
    return { strength: "Extremely difficult", tips: tips };
  }
}
function checkUsername(username) {
  let strength = 0;
  let tips = "";
  if (username.length < 8) {
    tips += "Make the username longer. ";
  } else {
    strength += 1;
  }

  if (username.match(/[a-z]/) && username.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters. ";
  }

  if (username.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  if (username.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  if (strength < 2) {
    return { strength: "Easy to guess", tips: tips };
  } else if (strength === 2) {
    return { strength: "Medium difficulty", tips: tips };
  } else if (strength === 3) {
    return { strength: "Difficult", tips: tips };
  } else {
    return { strength: "Extremely difficult", tips: tips };
  }
}

function nowDate() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newDate = `${year}/${month}/${day}`;
  return newDate;
}

module.exports = {
  checkPasswordStrength,
  checkUsername,
  nowDate,
};
