const express = require('express');
const cosmicBookController = require('../controller/cosmicBook.controller');
const route = express.Router();

// Use lowercase path for consistency
route.get('/comicbook', cosmicBookController.getCosmicBook);  // Retrieve all comic books
route.post('/comicbook', cosmicBookController.postCosmicBook);  // Add a new comic book
route.get('/comicbook/:id', cosmicBookController.getComicBookById); // Retrieve comic book by ID
route.delete('/comicbook/:id', cosmicBookController.deleteCosmicBook); // Delete comic book by ID
route.put('/comicbook/:id',cosmicBookController.updateCosmicBook);//update the cosmic book by the Id



module.exports = route;

