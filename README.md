# Mini-Project

=======
Program written in Node.js

# Functionality
This project uses the console.log to: 
- Read a file and display its content.
- Write content to a file.
- Delete a file.

# Error
Errors will be displayed in the console.log

miniporject2

# PART 2 

Starting Point: Use the codebase from Mini-Project 1 as the starting point.
Filesystem and Path Modules: Implement file operations using Node.js's fs and path modules.
HTTP Module: Extend the existing HTTP server using Node.js's http module.
RESTful API: Implement a RESTful API using only Node.js's http module.

#Files Added
server.js
users.JSON


The server will start on http://localhost:3000/.

## Routes
/api/items: View a list of items with delayed data retrieval.
/api/items/add: Render a page to add items.
/api/items/add/:id: Render a page to update items.
/api/items (POST): Add a new item.
/api/items/delete/:id (POST): Delete an item.
/api/items/update/:id (POST): Update an item.
/: Home page with links to the items and add items.


## Features
Add, update, and delete items in the store.
View a list of items with delayed data retrieval.
Express.js server with EJS for rendering views.