import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { GroceryItem } from '@/types/interfaces';


interface GroceryListProps {
  items: GroceryItem[];
  onItemAdd: (item: Omit<GroceryItem, 'id'>) => void;
  onItemRemove: (id: string) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ 
  items, 
  onItemAdd, 
  onItemRemove 
}) => {
  const [newItem, setNewItem] = useState<{
    name: string;
    quantity: string;
    unit: GroceryItem['unit'];
  }>({
    name: '',
    quantity: '',
    unit: 'kg'
  });
  

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.quantity.trim()) {
      onItemAdd({
        name: newItem.name.trim(),
        quantity: newItem.quantity.trim(),
        unit: newItem.unit
      });
      setNewItem({ name: '', quantity: '', unit: 'kg' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="grocery-list">
      <h3 className="grocery-list-title">Grocery List</h3>
      
      {/* Add New Item */}
      <div className="add-item-form">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          onKeyPress={handleKeyPress}
          placeholder="Item name (e.g., Rice, Milk, Onions)"
          className="item-name-input"
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          onKeyPress={handleKeyPress}
          placeholder="Qty"
          min="0"
          step="0.1"
          className="item-quantity-input"
        />
        <select
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value as GroceryItem['unit'] })}
          className="item-unit-select"
        >
          <option value="kg">kg</option>
          <option value="L">L</option>
          <option value="pcs">pcs</option>
          <option value="pack">pack</option>
          <option value="gm">gm</option>
          <option value="ml">ml</option>
        </select>
        <button
          onClick={handleAddItem}
          className="add-item-button"
          title="Add item to list"
        >
          <Plus className="add-icon" />
        </button>
      </div>

      {/* Current Items */}
      {items.length > 0 ? (
        <div className="current-items">
          {items.map((item) => (
            <div key={item.id} className="grocery-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <button
                onClick={() => onItemRemove(item.id)}
                className="remove-item-button"
                title="Remove item from list"
              >
                <Trash2 className="remove-icon" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-list">
          <p className="empty-message">No items in your grocery list yet.</p>
          <p className="empty-hint">Add items above to get started!</p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
