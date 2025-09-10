import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import GroceryList from '@/components/GroceryList/GroceryList';
import OfferCard from '@/components/OfferCard/OfferCard';
import SummaryCards from '@/components/SummaryCards/SummaryCards';
import { GroceryItem, Offer } from '@/types/interfaces';
import { 
  mockOffers, 
  calculateTotalSavings, 
  getNearestStore, 
  getBestShoppingTime 
} from '@/utils/mockData';


interface OptimizerProps {
  groceryList: GroceryItem[];
  onGroceryListUpdate: (newList: GroceryItem[]) => void;
}

const Optimizer: React.FC<OptimizerProps> = ({ 
  groceryList, 
  onGroceryListUpdate 
}) => {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGroceryItem = (item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      ...item
    };
    onGroceryListUpdate([...groceryList, newItem]);
  };

  const handleRemoveGroceryItem = (id: string) => {
    onGroceryListUpdate(groceryList.filter(item => item.id !== id));
  };

  const handleOptimize = async () => {
    if (groceryList.length === 0) {
      alert('Please add at least one item to your grocery list');
      return;
    }
    
    if (!location.trim()) {
      alert('Please enter your location');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setShowResults(false);
    setLocation('');
    setBudget('');
    onGroceryListUpdate([]);
  };

  // Calculate summary data
  const totalSavings = calculateTotalSavings(mockOffers);
  const nearestStore = getNearestStore(mockOffers);
  const bestShoppingTime = getBestShoppingTime(mockOffers);

  return (
    <div className="optimizer-container">
      {/* Input Section */}
      <div className="input-section">
        <div className="section-header">
          <h2 className="section-title">Plan Your Shopping</h2>
          <p className="section-subtitle">
            Enter your location and grocery items to find the best deals nearby
          </p>
        </div>
        
        {/* Location and Budget Inputs */}
        <div className="inputs-grid">
          <div className="input-group">
            <label className="input-label">Your Location *</label>
            <div className="input-with-icon">
              <MapPin className="input-icon" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address, area, or pincode"
                className="location-input"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Monthly Budget (₹)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Optional: Set your budget limit"
              className="budget-input"
              min="0"
            />
          </div>
        </div>

        {/* Grocery List Component */}
        <GroceryList
          items={groceryList}
          onItemAdd={handleAddGroceryItem}
          onItemRemove={handleRemoveGroceryItem}
        />

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={handleOptimize}
            disabled={!location.trim() || groceryList.length === 0 || isLoading}
            className="optimize-button"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Finding Best Deals...</span>
              </>
            ) : (
              <>
                <Search className="button-icon" />
                <span>Find Best Deals</span>
              </>
            )}
          </button>
          
          {(showResults || groceryList.length > 0 || location) && (
            <button
              onClick={handleReset}
              className="reset-button"
            >
              Reset & Start Over
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="results-section">
          <div className="results-header">
            <h2 className="section-title">Best Deals Found</h2>
            <p className="section-subtitle">
              Showing optimized deals for {groceryList.length} items in {location}
            </p>
          </div>

          {/* Summary Cards */}
          <SummaryCards
            totalSavings={totalSavings}
            nearestStore={nearestStore}
            bestShoppingTime={bestShoppingTime}
            totalItems={mockOffers.length}
          />

          {/* Offers List */}
          <div className="offers-section">
            <h3 className="offers-title">Available Offers</h3>
            <div className="offers-grid">
              {mockOffers.map((offer: Offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onSelect={(selectedOffer) => {
                    console.log('Selected offer:', selectedOffer);
                    // Here you could implement selection logic
                  }}
                />
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="recommendations-section">
            <h3 className="recommendations-title">💡 AI Recommendations</h3>
            <div className="recommendations-list">
              <div className="recommendation-item">
                <span className="recommendation-text">
                  Best time to shop: Visit Big Bazaar in the morning (9-11 AM) for maximum discounts
                </span>
              </div>
              <div className="recommendation-item">
                <span className="recommendation-text">
                  Money-saving tip: Buy rice from Big Bazaar and milk from Mother Dairy to save ₹{totalSavings}
                </span>
              </div>
              <div className="recommendation-item">
                <span className="recommendation-text">
                  Budget optimization: Your current selection fits well within typical monthly budgets
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Optimizer;