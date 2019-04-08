const app = require('./routes');

app.listen(5000, () => {
  console.log('check the page on http://localhost:5000');
});
module.exports = app;
