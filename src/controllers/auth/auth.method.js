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

async function generateToken(payload, secretSignature, tokenLife) {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Type Error occurred:", error.message);
    } else if (error instanceof ReferenceError) {
      console.error("Reference error occurred:", error.message);
    } else {
      console.error("Not create accessToken");
    }
    return null;
  }
}

async function verifyToken(token, secretKey) {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Type Error occurred:", error.message);
    } else if (error instanceof ReferenceError) {
      console.error("Reference error occurred:", error.message);
    } else {
      console.error("Error in verifying access token:", error.message);
    }
    return null;
  }
}

async function decodeToken(token, secretKey) {
  try {
    return await verify(token, secretKey, {
      ignoreExpiration: false,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Type Error occurred:", error.message);
    } else if (error instanceof ReferenceError) {
      console.error("Reference error occurred:", error.message);
    } else {
      console.error(`Error in decode access token: ${error}`);
    }
    return null;
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
  decodeToken,
  verifyToken,
  generateToken,
};
