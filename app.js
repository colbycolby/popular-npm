'use strict';
const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisifyAll(Promise.promisify(require('request')));
const _ = require('underscore');

Promise.join(
  request(`https://www.npmjs.com/browse/star?offset=0`),
  request(`https://www.npmjs.com/browse/star?offset=36`),
  request(`https://www.npmjs.com/browse/star?offset=72`),
  (chunk1, chunk2, chunk3) => {
    const html = chunk1.body + chunk2.body + chunk3.body;
    const $ = cheerio.load(html);
    const packageNames = $('.name').map((i, element) =>
      $(element).text())
      .get()
      return packageNames;
  })
  .then(packages =>
    request(`https://api.npmjs.org/downloads/point/last-week/${packages.join(',')}`)
    .then(dlCounts => _.sortBy(_.map(packages, name => ({name,downloads: JSON.parse(dlCounts.body)[name].downloads})), 'downloads'))
    .catch(err => console.error(err)))
  .then(result => console.log(result.reverse()))
  .catch(err => console.error(err));

