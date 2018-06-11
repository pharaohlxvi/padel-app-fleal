const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

let app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});

// const express = require('express');
// const path = require('path');
// const serveStatic = require('serve-static');
// const history = require('connect-history-api-fallback')
// // ^ middleware to redirect all URLs to index.html

// var app = express();
// app.use(history())
// app.use(express.static(__dirname));

// app.set(port, (process.env.PORT || 8080)); //5000

// app.listen(app.get(port), () => {
// // console.log(ENV: ${process.env.NODE_ENV});
// // console.log(Derp is running at localhost: ${app.get('port')});
// });
