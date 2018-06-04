var express = require('express')

var path = require('path');

var app = express();

var _PORT = 5080;

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(_PORT, () => {
  console.log(`App listening on port ${_PORT}!`);
});
