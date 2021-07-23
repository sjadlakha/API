
const record = require("../models/model.js");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return encrypted.toString('hex');
}
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}
// Create and Save a new Customer
exports.create = (req, res) => {
 if (!req.body) {
    res.status(400).send({
      message: "Empty !"
    });
  }

  enc_pwd = encrypt(req.body.password)
  const record = new record({
    website: req.body.website,
    username: req.body.username,
    password: enc_pwd
  });

  record.create(record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error!"
      });
    else res.send("success");
  });
};

// Retrieve all Customers from the database.
exports.getAll = (req, res) => {
    record.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else{
        data.forEach(record => {
            pwd = decrypt(record.password)
            record.password = pwd
        });
        res.send(data)
    }


  });
};
