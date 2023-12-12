import React, { useState, useEffect } from 'react';
import { useItemCounter } from './useItemCounter';

const ItemIndexer = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const { itemIndex, incrementItemIndex } = useItemCounter(0);

  const markAsCompleted = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemObject = {
      name: newItem,
      completed: false,
    };
    setItems([...items, itemObject]);
    setNewItem('');
    incrementItemIndex();
  };

  useEffect(() => {
    console.log('Items:', items);
  }, [items]);

  return (
    <div>
      <h1>The Stores Inventory</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add a new item'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type='submit'>Add Item</button>
      </form>

      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div>
          <p>Total items added: {itemIndex}</p>
          <ul>
            {items.map((itemObject, index) => (
              <li key={index} style={{ textDecoration: itemObject.completed ? 'line-through' : 'none' }}>
                {itemObject.name}
                <button onClick={() => markAsCompleted(index)}>
                  {itemObject.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemIndexer;
