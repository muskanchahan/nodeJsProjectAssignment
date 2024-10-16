const form = document.getElementById("comic-form");
const tbody = document.getElementById('tbody');

document.addEventListener('DOMContentLoaded', function () {
    axios.get('http://localhost:3000/comicBooks')
        .then((response) => {
            const comicBooks = response.data;  
            comicBooks.forEach((book) => {
                addComicToTable(book); 
            });
        })
        .catch((error) => {
            console.log('Error fetching comic book data:', error);
        });

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

        axios.post('http://localhost:3000/comicBooks', newComicBook)
            .then((result) => {
                addComicToTable(result.data); 
            })
            .catch((error) => {
                console.log('Error adding comic book', error);
            });

        form.reset();
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

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = '#FF0000';
    deleteBtn.style.color = 'white';
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener('click', function () {
        axios.delete(`http://localhost:3000/comicBooks/${book.id}`)
            .then(() => {
                tbody.removeChild(tr);
            })
            .catch((error) => {
                console.log('Error deleting comic book:', error);
            });
    });

    tdActions.appendChild(deleteBtn);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
}
