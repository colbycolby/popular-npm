const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const nunjucks = require('nunjucks');
const index = require('./routes/index');
const app = express();

// View engin setup
app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
})

app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Load routes
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const port = process.env.VCAP_APP_PORT || 3000;
app.listen(port, () => {
  console.log(`
  ☁️☁️   ☁️‌‌ ‌‌ ‌‌☁️‌‌☁️‌‌☁️‌‌    🌝‌‌☁️☁️‌‌    ☁️
  🌳   🌲  🌳 🌲‌    🌲 🌳‌‌ ‌‌ ‌‌ 🌲‌‌‌‌
  🌲🌳🌲  🌻🐿  🌲🌲🌳🌲   🌲🌲🌲🌲

  ʕノ◔ϖ◔ʔノ

  ${Date()}
  Listening ... port:${port}\n\n\n`);
});