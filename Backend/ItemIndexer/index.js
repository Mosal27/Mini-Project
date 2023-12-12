import express from 'express';
import methodOverride from 'method-override';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const uri = "mongodb://127.0.0.1:27017/";
let db;

(async function () {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log('Connected to MongoDB.');
    db = client.db("ItemIndexer");

  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  }
})();

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send(`<button><a href="/api/items"> Store Items </a></button> <button><a href="/api/items/add"> Add Item </a></button>`);
});

app.get('/api/items', async (req, res) => {
    try {
        const collection = db.collection('Items');
        const items = await collection.find({}).toArray();
        res.render('items', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching from database');
    }
});

app.get('/api/items/add', (req, res) => {
    res.render('itemForm.ejs');
});

app.get('/api/items/update/:id', (req, res) => {
    res.render('updateItem.ejs');
});

app.post('/api/items', async (req, res) => {
    try {
        const { itemName } = req.body;
        const collection = db.collection('Items');
        const newItem = {
            itemName,
        };
        await collection.insertOne(newItem);
        console.log("Saved to database");
        res.redirect('/api/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving to database');
    }
});

app.post('/api/items/delete/:id', async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const collection = db.collection('Items');
        const result = await collection.deleteOne({ _id: itemId });
        if (result.deletedCount === 1) {
            res.redirect('/api/items');
        } else {
            res.status(404).send(`Item with ID ${itemId} not found.`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting from database');
    }
});

app.post('/api/items/update/:id', async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const updateName = req.body.itemName;
        const collection = db.collection('items');
        const result = await collection.updateOne({ _id: itemId }, { $set: { itemName: updateName } });
        if (result.modifiedCount === 1) {
            res.redirect('/api/items');
        } else {
            res.status(404).send(`Item with ID ${itemId} not found.`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating database');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
