const { cosmicBook } = require('../database/database'); // Ensure the correct import
const { Op } = require('sequelize');

 

const getCosmicBook = async (req, res) => {
    const { page = 1, limit = 3, author, year, price, condition, sortBy = 'bookName', order = 'ASC' } = req.query; // Destructure query parameters

    try {
        // Set the limit and offset for pagination
        const offset = (page - 1) * limit;

        // Build the where clause for filtering
        const whereClause = {};
        if (author) whereClause.authorName = author; // Filter by author
        if (year) whereClause.yearOfPublication = year; // Filter by year
        if (price) whereClause.price = price; // Filter by price
        if (condition) whereClause.condition = condition; // Filter by condition

        // Fetch the total number of comic books that match the filters
        const totalBooks = await cosmicBook.count({ where: whereClause });

        // Fetch the comic books with pagination, filtering, and sorting
        const books = await cosmicBook.findAll({
            where: whereClause,
            limit: parseInt(limit), // Limit the number of results
            offset: parseInt(offset), // Set the offset for pagination
            order: [[sortBy, order]] // Sort by the specified field
        });

        // Log the fetched books for debugging purposes
        console.log('Fetched comic books:', books);

        // Respond with a 200 status code and the list of books along with pagination info
        res.status(200).json({
            totalBooks, // Total number of books matching the filters
            page: parseInt(page), // Current page number
            limit: parseInt(limit), // Limit per page
            comicBooks: books // The array of fetched comic books
        });
    } catch (error) {
        // Log the error message for debugging
        console.error("Error fetching books:", error);

        // Respond with a 500 status code and an error message
        res.status(500).json({ error: "Failed to fetch books details" });
    }
};


const postCosmicBook = async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const newCosmicBook = await cosmicBook.create(req.body);
        res.status(201).json(newCosmicBook);
        console.log('New book details created:', newCosmicBook);
    } catch (error) {
        console.log('Error creating book details:', error);
        res.status(500).json({ error: 'Failed to create the item' });
    }
};

// New function to get comic book by ID
const getComicBookById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const book = await cosmicBook.findByPk(id); // Find the book by primary key (ID)
        if (book) {
            res.status(200).json(book); // Return the book details if found
        } else {
            res.status(404).json({ error: "Book not found" }); // Return error if not found
        }
    } catch (error) {
        console.log("Error fetching book details:", error);
        res.status(500).json({ error: "Failed to fetch book details" });
    }
};

const deleteCosmicBook = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const book = await cosmicBook.findByPk(id); // Find the book by primary key (ID)
        if (!book) {
            return res.status(404).json({ error: 'Book not found' }); // Return error if not found
        } else {
            await cosmicBook.destroy({ where: { id } }); // Destroy the book by ID
            res.status(200).json({ message: 'Book details deleted successfully' }); // Success message
            console.log(`Book with ID ${id} deleted successfully.`);
        }
    } catch (error) {
        console.log("Error deleting book:", error);
        res.status(500).json({ error: "Failed to delete book details" });
    }
};



const updateCosmicBook = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    const { price, discount, condition } = req.body; // Expecting these fields in the request body

    try {
        const book = await cosmicBook.findByPk(id);
        if (book) {
            // Update the book fields
            book.price = price;
            book.discount = discount;
            book.condition = condition;
            await book.save(); // Save the updated book

            console.log('Updated successfully:', book);
            res.status(200).json(book); // Return the updated book
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server issue' });
    }
};


module.exports = {
    getCosmicBook,
    postCosmicBook,
    getComicBookById,
    deleteCosmicBook,
    updateCosmicBook
};
