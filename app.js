const express = require('express');
const path = require('path');
const cors = require('cors');
const { cosmicBook } = require('./database/database'); // Ensure the import is correct
const cosmicBookRoute = require('./route/cosmicBook.route'); // Move this after imports for clarity

const app = express();
const port = 3000;

app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the cosmic book routes
app.use('/', cosmicBookRoute);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});

