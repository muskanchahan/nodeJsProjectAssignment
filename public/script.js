// const form = document.getElementById("comic-form");
// const tbody = document.getElementById('tbody');

// document.addEventListener('DOMContentLoaded', function () {
//     axios.get(`http://localhost:3000/comicbook`)
//         .then((response) => {
//             const comicBooks = response.data;  
//             comicBooks.forEach((book) => {
//                 addComicToTable(book); 
//             });
//         })
//         .catch((error) => {
//             console.log('Error fetching comic book data:', error);
//         });

//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const bookName = document.getElementById('bookName').value;
//         const authorName = document.getElementById('authorName').value;
//         const yearOfPublication = document.getElementById('yearOfPublication').value;
//         const price = document.getElementById('price').value;
//         const discount = document.getElementById('discount').value || 0;
//         const numberOfPages = document.getElementById('numberOfPages').value;
//         const condition = document.getElementById('condition').value;
//         const description = document.getElementById('description').value || '';

//         const newComicBook = {
//             bookName,
//             authorName,
//             yearOfPublication,
//             price,
//             discount,
//             numberOfPages,
//             condition,
//             description
//         };

//         axios.post('http://localhost:3000/comicbook', newComicBook)
//             .then((result) => {
//                 addComicToTable(result.data); 
//             })
//             .catch((error) => {
//                 console.log('Error adding comic book', error);
//             });

//         form.reset();
//     });
// });

// function addComicToTable(book) {
//     const tr = document.createElement('tr');

//     const tdBookName = document.createElement('td');
//     tdBookName.textContent = book.bookName;
//     tr.appendChild(tdBookName);

//     const tdAuthorName = document.createElement('td');
//     tdAuthorName.textContent = book.authorName;
//     tr.appendChild(tdAuthorName);

//     const tdYear = document.createElement('td');
//     tdYear.textContent = book.yearOfPublication;
//     tr.appendChild(tdYear);

//     const tdPrice = document.createElement('td');
//     tdPrice.textContent = `${book.price} Rs`;
//     tr.appendChild(tdPrice);

//     const tdDiscount = document.createElement('td');
//     tdDiscount.textContent = `${book.discount} Rs`;
//     tr.appendChild(tdDiscount);

//     const tdPages = document.createElement('td');
//     tdPages.textContent = book.numberOfPages;
//     tr.appendChild(tdPages);

//     const tdCondition = document.createElement('td');
//     tdCondition.textContent = book.condition;
//     tr.appendChild(tdCondition);

//     const tdDescription = document.createElement('td');
//     tdDescription.textContent = book.description;
//     tr.appendChild(tdDescription);

//     const tdActions = document.createElement('td');

//     // Edit Button
//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.style.backgroundColor = '#FFA500'; // Orange color for edit button
//     editBtn.style.color = 'white';
//     editBtn.style.padding = "6px 10px";
//     editBtn.style.border = "none";
//     editBtn.style.borderRadius = "4px";
//     editBtn.style.cursor = "pointer";

//     editBtn.addEventListener('click', function () {
//         const newPrice = prompt("Enter new price:", book.price);
//         const newDiscount = prompt("Enter new discount:", book.discount);
//         const newCondition = prompt("Enter new condition:", book.condition);
    
//         if (newPrice !== null && newDiscount !== null && newCondition !== null) {
//             const updatedComicBook = {
//                 price: newPrice,
//                 discount: newDiscount,
//                 condition: newCondition
//             };
    
//             axios.put(`http://localhost:3000/comicbook/${book.id}`, updatedComicBook)
//                 .then((response) => {
//                     if (response.data) {
//                         tdPrice.textContent = `${response.data.price} Rs`;
//                         tdDiscount.textContent = `${response.data.discount} Rs`;
//                         tdCondition.textContent = response.data.condition;
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error updating comic book:', error.response ? error.response.data : error.message);
//                 });
//         }
//     });
    
//     // Delete Button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.style.backgroundColor = '#FF0000';
//     deleteBtn.style.color = 'white';
//     deleteBtn.style.padding = "6px 10px";
//     deleteBtn.style.border = "none";
//     deleteBtn.style.borderRadius = "4px";
//     deleteBtn.style.cursor = "pointer";
    
//     deleteBtn.addEventListener('click', function () {
//         axios.delete(`http://localhost:3000/comicbook/${book.id}`) // Include book.id for delete
//             .then(() => {
//                 tbody.removeChild(tr);
//             })
//             .catch((error) => {
//                 console.error('Error deleting comic book:', error.response ? error.response.data : error.message);
//             });
//     });

//     tdActions.appendChild(editBtn);
//     tdActions.appendChild(deleteBtn);
//     tr.appendChild(tdActions);

//     tbody.appendChild(tr);
// }


const form = document.getElementById("comic-form");
const tbody = document.getElementById('tbody');
const paginationContainer = document.getElementById('pagination'); // Add a container for pagination controls

let currentPage = 1;
const limit = 3; // Set the limit for number of books per page

// Function to fetch comic books with pagination and filters
function fetchComicBooks(page = 1, filters = {}) {
    const params = new URLSearchParams({ page, limit, ...filters });

    axios.get(`http://localhost:3000/comicbook?${params.toString()}`)
        .then((response) => {
            const { comicBooks, totalBooks } = response.data;
            tbody.innerHTML = ''; // Clear existing table rows
            comicBooks.forEach((book) => {
                addComicToTable(book);
            });

            // Update pagination controls
            updatePagination(totalBooks);
        })
        .catch((error) => {
            console.log('Error fetching comic book data:', error);
        });
}

// Function to update pagination controls
function updatePagination(totalBooks) {
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(totalBooks / limit);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            fetchComicBooks(currentPage);
        };
        paginationContainer.appendChild(button);
    }
}

// Initial fetch for comic books on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchComicBooks(currentPage); // Fetch books on page load

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const bookName = document.getElementById('bookName').value;
        const authorName = document.getElementById('authorName').value;
        const yearOfPublication = document.getElementById('yearOfPublication').value;
        const price = document.getElementById('price').value;
        const discount = document.getElementById('discount').value || 0;
        const numberOfPages = document.getElementById('numberOfPages').value;
        const condition = document.getElementById('condition').value;
        const description = document.getElementById('description').value || '';

        const newComicBook = {
            bookName,
            authorName,
            yearOfPublication,
            price,
            discount,
            numberOfPages,
            condition,
            description
        };

        axios.post('http://localhost:3000/comicbook', newComicBook)
            .then((result) => {
                addComicToTable(result.data);
            })
            .catch((error) => {
                console.log('Error adding comic book', error);
            });

        form.reset();
    });

    // Add event listeners for filters and sorting
    document.getElementById('filter-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const filters = {
            author: document.getElementById('filter-author').value,
            year: document.getElementById('filter-year').value,
            price: document.getElementById('filter-price').value,
            condition: document.getElementById('filter-condition').value,
            sortBy: document.getElementById('sort-by').value,
            order: document.getElementById('sort-order').value,
        };
        fetchComicBooks(currentPage, filters);
    });
});

function addComicToTable(book) {
    const tr = document.createElement('tr');

    const tdBookName = document.createElement('td');
    tdBookName.textContent = book.bookName;
    tr.appendChild(tdBookName);

    const tdAuthorName = document.createElement('td');
    tdAuthorName.textContent = book.authorName;
    tr.appendChild(tdAuthorName);

    const tdYear = document.createElement('td');
    tdYear.textContent = book.yearOfPublication;
    tr.appendChild(tdYear);

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `${book.price} Rs`;
    tr.appendChild(tdPrice);

    const tdDiscount = document.createElement('td');
    tdDiscount.textContent = `${book.discount} Rs`;
    tr.appendChild(tdDiscount);

    const tdPages = document.createElement('td');
    tdPages.textContent = book.numberOfPages;
    tr.appendChild(tdPages);

    const tdCondition = document.createElement('td');
    tdCondition.textContent = book.condition;
    tr.appendChild(tdCondition);

    const tdDescription = document.createElement('td');
    tdDescription.textContent = book.description;
    tr.appendChild(tdDescription);

    const tdActions = document.createElement('td');

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.backgroundColor = '#FFA500'; // Orange color for edit button
    editBtn.style.color = 'white';
    editBtn.style.padding = "6px 10px";
    editBtn.style.border = "none";
    editBtn.style.borderRadius = "4px";
    editBtn.style.cursor = "pointer";

    editBtn.addEventListener('click', function () {
        const newPrice = prompt("Enter new price:", book.price);
        const newDiscount = prompt("Enter new discount:", book.discount);
        const newCondition = prompt("Enter new condition:", book.condition);
    
        if (newPrice !== null && newDiscount !== null && newCondition !== null) {
            const updatedComicBook = {
                price: newPrice,
                discount: newDiscount,
                condition: newCondition
            };
    
            axios.put(`http://localhost:3000/comicbook/${book.id}`, updatedComicBook)
                .then((response) => {
                    if (response.data) {
                        tdPrice.textContent = `${response.data.price} Rs`;
                        tdDiscount.textContent = `${response.data.discount} Rs`;
                        tdCondition.textContent = response.data.condition;
                    }
                })
                .catch((error) => {
                    console.error('Error updating comic book:', error.response ? error.response.data : error.message);
                });
        }
    });
    
    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = '#FF0000';
    deleteBtn.style.color = 'white';
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    
    deleteBtn.addEventListener('click', function () {
        axios.delete(`http://localhost:3000/comicbook/${book.id}`) // Include book.id for delete
            .then(() => {
                tbody.removeChild(tr);
            })
            .catch((error) => {
                console.error('Error deleting comic book:', error.response ? error.response.data : error.message);
            });
    });

    tdActions.appendChild(editBtn);
    tdActions.appendChild(deleteBtn);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
}
