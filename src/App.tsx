import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/pages/Layout/Layout";
import Optimizer from "@/pages/Optimizer/Optimizer";
import History from "@/pages/History/History";
import { GroceryItem } from "@/types/interfaces";

const App: React.FC = () => {
  const [groceryList, setGroceryList] = React.useState<GroceryItem[]>([
    { id: "1", name: "Rice", quantity: "1", unit: "kg" },
    { id: "2", name: "Milk", quantity: "1", unit: "L" },
  ]);

  const location = useLocation();
  const initialTab: 'optimizer' | 'history' = location.pathname === "/history" ? 'history' : 'optimizer';
  const [activeTab, setActiveTab] = React.useState<'optimizer' | 'history'>(initialTab);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout activeTab={activeTab} onTabChange={setActiveTab} />}
      >
        <Route
          index
          element={
            <Optimizer
              groceryList={groceryList}
              onGroceryListUpdate={setGroceryList}
            />
          }
        />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
};

// Wrap App in Router at root
const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
