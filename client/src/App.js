import './App.css';
import JSXExample from './JSXExample';
import Welcome from './FunctionalComponent';
import OrganicStore from './ClassComponent'

            import React, { useState, useEffect } from 'react';

            // Functional component
            const App = () => {
              const [items, setItems] = useState([]); 
            
              const fetchItems = async () => {
                try {
                  const response = await fetch('/api/items');
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setItems(data);
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              };
            <div>
              
            <JSXExample />
            <Welcome/>
            <OrganicStore/>
            </div>
              useEffect(() => {
                fetchItems();
              }, []);
            
              const handleRefresh = () => {
                fetchItems();
              };
            
              return (
                <div>
                  <h1>Item List</h1>
                  <button onClick={handleRefresh}>Refresh</button>
                  <ul>
                    {items.map(item => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              );
            };
            
            export default App;
            