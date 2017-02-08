'use strict';
const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisifyAll(Promise.promisify(require('request')));
const _ = require('underscore');

const getPackages = (req, res) =>
  Promise.join(
    request(`https://www.npmjs.com/browse/star?offset=0`),
    request(`https://www.npmjs.com/browse/star?offset=36`),
    request(`https://www.npmjs.com/browse/star?offset=72`),
    (chunk1, chunk2, chunk3) => {
      const html = chunk1.body + chunk2.body + chunk3.body;
      const $ = cheerio.load(html);
      const packages = $('.name').map((i, element) =>
        $(element).text())
        .get()
      return(packages);
    })
    .then(packages =>
      request(`https://api.npmjs.org/downloads/point/last-week/${packages.join(',')}`)
      .then(dlCounts => _.sortBy(_.map(packages, name => ({name,downloads: JSON.parse(dlCounts.body)[name].downloads})), 'downloads'))
      .catch(err => res.status(500).send(Error(err)))
    .then(result => res.send(result))
    .catch(err => res.status(500).send(Error(err))));

module.exports = (app, includes) =>
  app.get('/npm/packages', getPackages);
