# npmjs

This is currently a script that scrapes https://www.npmjs.com/ for the top 100 popular packages and gets their daily, weekly, and monthly download counts.

## Running

Clone repo
```bash
$ npm i
$ node script.js
```

example output:
```
[
  {
    "name": "express",
    "daily": 461592,
    "weekly": 2656439,
    "monthly": 11384218
  },
  {
    "name": "gulp",
    "daily": 133349,
    "weekly": 748169,
    "monthly": 2980326
  },
  {
    "name": "request",
    "daily": 984247,
    "weekly": 5722383,
    "monthly": 24818621
  },
  {
    "name": "async",
    "daily": 1850609,
    "weekly": 10367684,
    "monthly": 43451451
  }, 
  ......
]
```