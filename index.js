const express = require('express');
const path = require('node:path');

const app = express();
const publicDirectory = path.join(__dirname, 'public');

app.use(express.static(publicDirectory));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Scoreboard available at http://localhost:${port}`);
  });
}

module.exports = app;
