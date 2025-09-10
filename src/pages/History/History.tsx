import React, { useState } from 'react';
import { ShoppingCart, Calendar, TrendingDown, Store, Filter } from 'lucide-react';
import { mockPurchaseHistory } from '@/utils/mockData';
import { PurchaseHistory } from '@/types/interfaces';


const History: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'savings', label: 'Savings' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalSpent = mockPurchaseHistory.reduce((sum: any, purchase: { totalAmount: any; }) => sum + purchase.totalAmount, 0);
  const totalSaved = mockPurchaseHistory.reduce((sum: any, purchase: { totalSavings: any; }) => sum + purchase.totalSavings, 0);

  return (
    <div className="history-container">
      {/* Summary Stats */}
      <div className="stats-section">
        <h2 className="section-title">Purchase History Overview</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-blue-100">
              <ShoppingCart className="stat-icon text-blue-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Purchases</p>
              <p className="stat-value">{mockPurchaseHistory.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper bg-green-100">
              <TrendingDown className="stat-icon text-green-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Saved</p>
              <p className="stat-value text-green-600">₹{totalSaved}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper bg-purple-100">
              <Store className="stat-icon text-purple-600" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Spent</p>
              <p className="stat-value">₹{totalSpent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-header">
          <h3 className="filters-title">
            <Filter className="h-5 w-5" />
            Filter & Sort
          </h3>
        </div>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Time Period</label>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="filter-select"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Purchase History List */}
      <div className="history-list-section">
        <h3 className="section-subtitle">Recent Purchases</h3>
        
        {mockPurchaseHistory.length > 0 ? (
          <div className="history-list">
            {mockPurchaseHistory.map((purchase: { id: React.Key | null | undefined; date: string; totalAmount: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; totalSavings: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; items: any[]; stores: any[]; }) => (
              <div key={purchase.id} className="history-item">
                <div className="history-header">
                  <div className="history-date">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatDate(purchase.date)}</span>
                  </div>
                  <div className="history-amount">
                    <span className="amount-spent">₹{purchase.totalAmount}</span>
                    <span className="amount-saved text-green-600">
                      Saved ₹{purchase.totalSavings}
                    </span>
                  </div>
                </div>

                <div className="history-details">
                  <div className="items-section">
                    <h4 className="items-title">Items Purchased:</h4>
                    <div className="items-list">
                      {purchase.items.map((item, index) => (
                        <span key={item.id} className="item-tag">
                          {item.name} ({item.quantity} {item.unit})
                          {index < purchase.items.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="stores-section">
                    <h4 className="stores-title">Stores Visited:</h4>
                    <div className="stores-list">
                      {purchase.stores.map((store, index) => (
                        <span key={store} className="store-tag">
                          {store}
                          {index < purchase.stores.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-history">
            <ShoppingCart className="empty-icon" />
            <p className="empty-title">No Purchase History</p>
            <p className="empty-description">
              Start using the optimizer to track your purchases and savings!
            </p>
          </div>
        )}
      </div>

      {/* AI Insights Section */}
      <div className="insights-section">
        <h3 className="insights-title">💡 Purchase Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4 className="insight-title">Most Visited Store</h4>
            <p className="insight-value">Big Bazaar</p>
            <p className="insight-description">60% of your purchases</p>
          </div>
          
          <div className="insight-card">
            <h4 className="insight-title">Best Savings Month</h4>
            <p className="insight-value">January 2024</p>
            <p className="insight-description">₹110 saved this month</p>
          </div>
          
          <div className="insight-card">
            <h4 className="insight-title">Top Category</h4>
            <p className="insight-value">Staples & Dairy</p>
            <p className="insight-description">Most frequent purchases</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;