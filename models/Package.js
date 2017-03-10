const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisifyAll(Promise.promisify(require('request')));
const _ = require('lodash');

const Package = {
  getMostStared: () =>
    Promise.join(
      request(`https://www.npmjs.com/browse/star?offset=0`),
      request(`https://www.npmjs.com/browse/star?offset=36`),
      request(`https://www.npmjs.com/browse/star?offset=72`),
      (chunk1, chunk2, chunk3) => {
        const html = chunk1.body + chunk2.body + chunk3.body;
        const $ = cheerio.load(html);
        const packages = $('.name').map((i, element) =>
          $(element).text()).get()
        return(packages);
      })
      .then(packages =>
        Promise.join(
          request({url:`https://api.npmjs.org/downloads/point/last-day/${packages.join()}`, json:true}),
          request({url:`https://api.npmjs.org/downloads/point/last-week/${packages.join()}`, json:true}),
          request({url:`https://api.npmjs.org/downloads/point/last-month/${packages.join()}`, json:true}),
          (day, week, month) =>
            _.map(packages, name =>
             ({name,
               daily: day.body[name].downloads,
               weekly: week.body[name].downloads,
               monthly: month.body[name].downloads,
             }))))
}

module.exports = Package;
