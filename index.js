const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next()
})


const items = [
    { id: 1, name: 'tea', price: 4.20 },
    { id: 2, name: 'milk', price: 4.99 },
    { id: 3, name: 'water' , price: 300},
]



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
  
app.get('/api/items/add', (req,res) =>{
    res.render('itemsfull.ejs',{ items });
})



app.get('/api/items/add/:id', (req,res) =>{
  res.render('updateItems.ejs');
})

app.post('/api/items', (req, res)=>{

  console.log(req.body.name);

  const newItems ={
  id:items.length + 1,
  name: req.body.name
  };

  workouts.push(newItems);
  res.redirect('/api/items');

})

app.post('/api/items/delete/:id', (req, res) => {
  const itemID = parseInt(req.params.id);

  const index = items.findIndex(item => item.id === itemID);

  if (index !== -1) {
    items.splice(index, 1);
    res.redirect('/api/items/');
  } else {
    res.status(404).send(`Item with ID ${itemID} not found.`);
  }
});

app.post('/api/items/update/:id', (req, res) => {
  const itemID = parseInt(req.params.id);
  const updatedName = req.body.name;

  const itemToUpdate = items.find(item => item.id === itemID);

  if (itemToUpdate) {
    itemToUpdate.name = updatedName;
    res.redirect('/api/items');
  } else {
    res.status(404).send(`Item with ID ${itemID} not found.`);
  }
});

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my store</h1><button><a href="/api/items">Items</a></button> <button><a href="/api/items/add">Add Items</a></button>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)})