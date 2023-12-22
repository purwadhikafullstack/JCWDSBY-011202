const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gibrand789@gmail.com',
    pass: 'kxujewzgpuagrbvn',
  },
});

module.exports = transporter;
