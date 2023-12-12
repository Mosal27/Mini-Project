import express from 'express';
import methodOverride from 'method-override';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const uri = "mongodb://127.0.0.1:27017/";
let db;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch(err => console.log("Could not connect to MongoDB", err));

(async function () {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log('Connected to MongoDB.');
    db = client.db("ItemIndexer");
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  }
})();

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
});

const Item = mongoose.model('Item', itemSchema);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send(`<button><a href="/api/items"> Store Items </a></button> <button><a href="/api/items/add"> Add Item </a></button>`);
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('items', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching items from the database');
  }
});

app.get('/api/items/add', (req, res) => {
  res.render('itemForm.ejs');
});

app.post('/api/items', async (req, res) => {
  try {
    const { itemName, itemPrice } = req.body;
    const newItem = new Item({
      itemName,
      itemPrice,
    });
    await newItem.save();
    console.log("Item saved to the database");
    res.redirect('/api/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving item to the database');
  }
});

app.post('/api/items/update/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { itemName, itemPrice } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { itemName, itemPrice },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send(`Item with ID ${itemId} not found.`);
    }

    res.redirect('/api/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item in the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
