const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'app' directory
app.use(express.static(path.join(__dirname, 'app')));

// Define a catch-all route for serving the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
