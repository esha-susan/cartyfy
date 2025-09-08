import React, { useState } from 'react'; // React and useState hook
import './App.css'; // Styles for App


// Define a type for tabs: either 'optimizer' or 'history'
// This helps TypeScript check we only use valid tab names
type ActiveTab = 'optimizer' | 'history';

function App() {
  // State to keep track of which tab is currently active
  // Initial tab is set to 'optimizer'
  const [activeTab, setActiveTab] = useState<ActiveTab>('optimizer');

  // Minimal grocery list state
  const [groceryList, setGroceryList] = useState([
    { id: '1', name: 'Rice', quantity: '1', unit: 'kg' },
    { id: '2', name: 'Milk', quantity: '1', unit: 'L' }
  ]);
 // Function to change the active tab
  // It updates the activeTab state
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  // Update grocery list (placeholder function)
  const handleGroceryListUpdate = (newList: typeof groceryList) => {
    setGroceryList(newList);
  };


  // Function to decide what content to show based on the active tab
  const renderActiveTab=()=>{
    switch(activeTab){
      case'optimizer':
       return<div>Optimiser Tab content</div>
      case 'history':
        return <div>History Tab content</div>
      default:
        return <div>Optimiser Tab Content</div>
    }
  };

  return (
    <div className="App">
      
      <header>
        <button onClick={() => handleTabChange('optimizer')}>Optimizer</button>
        <button onClick={() => handleTabChange('history')}>History</button>
      </header>

      
      {renderActiveTab()}
    </div>
  );
}

export default App; //Export app to import it in main.tsx
