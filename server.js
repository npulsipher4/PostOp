const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Serve static files from the 'app' directory
app.use(express.static(path.join(__dirname, 'app')));

// Handle all routes
app.get('*', (req, res) => {
    const route = req.path === '/' ? 'index' : req.path.slice(1);
    res.render(route, (err, html) => {
        if (err) {
            if (err.message.includes('Failed to lookup view')) {
                return res.status(404).render('404');
            }
            return res.status(500).render('500');
        }
        res.send(html);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
