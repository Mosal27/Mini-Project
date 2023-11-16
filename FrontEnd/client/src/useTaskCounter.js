import { useState, useEffect } from 'react';

export const useTaskCounter = (initialCount = 0) => {
  const [taskCount, setTaskCount] = useState(initialCount);

  useEffect(() => {
    console.log('Task count updated:', taskCount);
  }, [taskCount]);

  const incrementTaskCount = () => {
    setTaskCount(taskCount + 1);
  };

  return { taskCount, incrementTaskCount };
};
