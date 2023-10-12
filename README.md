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
- /api/items: View a list of items with delayed data retrieval.
- /api/items/add: Render a page to add items.
- /api/items/add/:id: Render a page to update items.
- /api/items (POST): Add a new item.
- /api/items/delete/:id (POST): Delete an item.
- /api/items/update/:id (POST): Update an item.
- /: Home page with links to the items and add items.


## Features
Add, update, and delete items in the store.
View a list of items with delayed data retrieval.
Express.js server with EJS for rendering views.

#Miniproject 4
not much change
###Promises and async

 app.get('/api/items', async (req, res) => {
    
    try {
      
      const delayedData = new Promise((resolve) => {
        
        setTimeout(() => {
          
          resolve(items);
          
        }, 2000);
      });
  
      const result = await delayedData;

      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
#mini project 5
The main file of the application is App.js, where you can find the structure of the React app. It includes:

Fetching data from an API (located at /api/items) and displaying the list of items.
Rendering JSX components: JSXExample, Welcome, and OrganicStore.
A "Refresh" button that fetches and updates the item list.
Basic event handling and state management using React Hooks (useState and useEffect).