import React, { useState, useEffect } from 'react';
import styles from './FetchAPI.module.css';

const FetchAPI = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventory</h1>

      {Array.isArray(items) ? (
        <ul className={styles.itemList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.itemName}>{item.itemName}</span>
              <span className={styles.itemPrice}> Price: {item.itemPrice}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchAPI;
