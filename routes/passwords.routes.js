module.exports = app => {
  const records = require("../controllers/records.controller.js");

// Add new
  app.post("/app/sites", records.create);

// Get all
  app.get("/app/sites/list", records.getAll);

};