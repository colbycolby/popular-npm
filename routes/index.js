const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Package = require('../models/Package');

/* GET home page. */
router.get('/', (req, res) => {
  Package.getMostStared()
  .then((packages) => {
    const data = {
      pageTitle: 'NPM Packages',
      packages,
    }
    res.render('index', data);
  })
  .catch(() => {
    res.status(500).send('Unable to render page');
  });
})

module.exports = router;