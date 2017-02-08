'use strict';
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);

const port = process.env.VCAP_APP_PORT || 3000;
app.listen(port, () => {
  console.log(`
  ☁️☁️   ☁️‌‌ ‌‌ ‌‌☁️‌‌☁️‌‌☁️‌‌    🌝‌‌☁️☁️‌‌    ☁️
  🌳   🌲  🌳 🌲‌    🌲 🌳‌‌ ‌‌ ‌‌ 🌲‌‌‌‌
  🌲🌳🌲  🌻🐿  🌲🌲🌳🌲   🌲🌲🌲🌲
  Listening ... port:${port}`);
});