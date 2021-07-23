const sql = require("./db.js");

const record = function(record) {
  this.website = customer.website;
  this.username = customer.username;
  this.password = customer.password;
};

// Add new
record.create = (newRecord, result) => {
  sql.query("INSERT INTO passwords SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created record: ", { id: res.insertId, ...newRecord });
    result(null, { id: res.insertId, ...newRecord });
  });
};

// Access all
record.getAll = result => {
  sql.query("SELECT * FROM passwords", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Passwords: ", res);
    result(null, res);
  });
};


module.exports = record;