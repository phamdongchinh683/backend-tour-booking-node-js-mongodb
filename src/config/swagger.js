const path = require("path");

module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api tour booking",
      version: "1.0.0",
      description:
        "Create, Read, Update, and Delete operations using a Node.js API",
    },
    servers: [{ url: "http://localhost:8080" }],
  },

  apis: [path.join(__dirname, "../routers/**/*.js")],
};
