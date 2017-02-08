'use strict';
const fs = require('fs');

module.exports = (app) => {
  fs.readdirSync('./routes/api').forEach(file =>
    require('./api/' + file)(app));
};
