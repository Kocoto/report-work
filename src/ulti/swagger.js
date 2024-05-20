const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Report work",
    version: "1.0.0",
    description: "API documentation for your application",
  },
  servers: [
    {
      url: "http://localhost:10000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["../routes/home.js"],
};

const path = require("path");
const filePath = path.join(__dirname, "routes", "home.js");
console.log(filePath);
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
