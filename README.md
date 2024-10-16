
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NodeJs Project Assignment - Comic Book Store API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #2e2e2e;  
            color: #f9f9f9;  
        }
        h1, h2, h3, h4 {
            color: #ffffff;  
        }
        code {
            background-color: #3a3a3a;  
            color: #f8f8f2; 
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #3a3a3a;  
            color: #f8f8f2;   
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        ul {
            margin: 0;
            padding: 0 20px;
        }
    </style>
</head>
<body>

<h1>NodeJs Project Assignment</h1>

<h2>Comic Book Store API</h2>
<p>This project is a backend application built using Node.js and Express.js to manage a comic book store's inventory. It provides CRUD operations for managing comic books and includes filter and pagination functionalities to retrieve books based on specific criteria.</p>

<h3>Features</h3>
<ul>
    <li>Add, update, delete, and retrieve comic books.</li>
    <li>Pagination and sorting support.</li>
    <li>Filtering options for author, year of publication, price, and condition.</li>
</ul>

<h3>Technologies Used</h3>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>Sequelize (as ORM)</li>
    <li>MySQL (for database)</li>
    <li>Other essential middleware like body-parser and cors</li>
</ul>

<h3>Project Structure</h3>
<pre><code>/nodeJsProjectAssignment
├── /controllers          # Contains the logic for handling requests
├── /database             # Contains the Sequelize configuration and models
├── /routes               # Contains route definitions
├── /public               # Contains HTML, CSS, and JavaScript files for the frontend
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── app.js                # Main server file
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
</code></pre>

<h3>Installation and Setup</h3>
<p>Follow these steps to run the project locally:</p>

<h4>Prerequisites</h4>
<ul>
    <li>Node.js</li>
    <li>MySQL</li>
</ul>

<h4>Dependencies</h4>
<p>Ensure you have the following dependencies installed in your project:</p>
<pre><code>npm install express sequelize mysql2 body-parser cors dotenv</code></pre>

<h3>How to Run the Code</h3>
<p>Follow these steps to run the project locally:</p>

<ol>
    <li>Clone the repository using Git:
        <pre><code>git clone https://github.com/muskanchahan/nodeJsProjectAssignment</code></pre>
    </li>
    <li>Navigate into the project directory:
        <pre><code>cd nodeJsProjectAssignment</code></pre>
    </li>
    <li>Install the required dependencies:
        <pre><code>npm install express sequelize mysql2 body-parser cors dotenv</code></pre>
    </li>
    <li>Run the application:
        <pre><code>node app.js</code></pre>
    </li>
    <li>Open your browser and navigate to <code>http://localhost:3000</code> to access the application.</li>
</ol>

<h3>Frontend Integration</h3>
<p>The frontend is served statically from the <code>/public</code> folder. Here’s how to set it up:</p>

<h4>Public Folder Structure</h4>
<ul>
    <li><code>index.html</code>: The main HTML file that serves as the entry point for the application.</li>
    <li><code>styles.css</code>: Contains the CSS styles for the frontend.</li>
    <li><code>script.js</code>: Contains JavaScript code for making API requests and handling user interactions.</li>
</ul>

<h4>Example HTML Integration</h4>
<p>In your <code>index.html</code>, you can create a simple interface to interact with the Comic Book Store API:</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Comic Book Store&lt;/title&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Comic Book Store&lt;/h1&gt;
    &lt;div id="comic-list"&gt;&lt;/div&gt;
    &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h4>Example JavaScript for API Interaction</h4>
<p>In <code>script.js</code>, you can use the Fetch API or Axios to make requests to your backend:</p>
<pre><code>const API_URL = '/api/comics'; // Adjust based on your API route

async function fetchComics(filters = {}, pagination = { page: 1, limit: 10 }) {
    const response = await fetch(\`\${API_URL}?author=\${filters.author}&year=\${filters.year}&price=\${filters.price}&condition=\${filters.condition}&page=\${pagination.page}&limit=\${pagination.limit}\`);
    const data = await response.json();
    return data;
}

// Example function to display comics
async function displayComics() {
    const comics = await fetchComics();
    const comicList = document.getElementById('comic-list');
    comicList.innerHTML = comics.map(comic => \`&lt;div&gt;\${comic.title} by \${comic.author}&lt;/div&gt;\`).join('');
}

// Call displayComics on page load
displayComics();</code></pre>

<h3>Conclusion</h3>
<p>This README provides an overview of the Comic Book Store API and instructions on how to integrate the frontend with the backend. By utilizing the <code>/public</code> folder to serve static files, you can create a comprehensive comic book management system.</p>

<p>This README details the Comic Book Store API, a Node.js and Express.js application for managing comic book inventory. Key features include CRUD operations, pagination, and filtering by author, publication year, price, and condition. The project uses Sequelize for database management with MySQL, serving static files from the <code>/public</code> folder, where HTML, CSS, and JavaScript are integrated to create a user-friendly interface for managing comic books.</p>

</body>
</html>
