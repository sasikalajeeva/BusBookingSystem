const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Redirect root to /sara-coding
app.get('/', (req, res) => {
  res.redirect('/sara-coding');
});

// Serve all static files under /sara-coding path
app.use('/sara-coding', express.static(__dirname));

// Explicitly serve index.html for /sara-coding
app.get('/sara-coding', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}/sara-coding`);
  console.log(`📱 Your app is available at: http://localhost:${PORT}/sara-coding`);
  console.log(`📂 Serving files from: ${__dirname}\n`);
});
