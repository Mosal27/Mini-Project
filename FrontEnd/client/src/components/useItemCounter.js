import { useState, useEffect } from 'react';

export const useItemCounter = (initialCount = 0) => {
  const [itemIndex, setItemIndex] = useState(initialCount);

  useEffect(() => {
    console.log('Item index updated:', itemIndex);
  }, [itemIndex]);

  const incrementItemIndex = () => {
    setItemIndex(itemIndex + 1);
  };

  return { itemIndex, incrementItemIndex };
};