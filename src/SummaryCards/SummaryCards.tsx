import React from 'react';
import { TrendingDown, MapPin, Clock, ShoppingBag } from 'lucide-react';
import './SummaryCards.css';

interface SummaryCardsProps {
  totalSavings: number;
  nearestStore: string;
  bestShoppingTime: string;
  totalItems: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalSavings,
  nearestStore,
  bestShoppingTime,
  totalItems
}) => {
  const cards = [
    {
      id: 'savings',
      title: 'Total Savings',
      value: `₹${totalSavings}`,
      icon: TrendingDown,
      color: 'green',
      description: 'vs. original prices'
    },
    {
      id: 'nearest',
      title: 'Nearest Store',
      value: nearestStore.split('(')[0].trim(),
      icon: MapPin,
      color: 'blue',
      description: nearestStore.includes('(') ? nearestStore.split('(')[1].replace(')', '') : ''
    },
    {
      id: 'time',
      title: 'Best Shopping Time',
      value: bestShoppingTime.split('(')[0].trim(),
      icon: Clock,
      color: 'purple',
      description: bestShoppingTime.includes('(') ? bestShoppingTime.split('(')[1].replace(')', '') : ''
    },
    {
      id: 'items',
      title: 'Items Found',
      value: totalItems.toString(),
      icon: ShoppingBag,
      color: 'orange',
      description: 'deals available'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        value: 'text-green-800',
        desc: 'text-green-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        value: 'text-blue-800',
        desc: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        value: 'text-purple-800',
        desc: 'text-purple-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        value: 'text-orange-800',
        desc: 'text-orange-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="summary-cards">
      {cards.map((card) => {
        const colorClasses = getColorClasses(card.color);
        const IconComponent = card.icon;
        
        return (
          <div 
            key={card.id} 
            className={`summary-card ${colorClasses.bg} ${colorClasses.border}`}
          >
            <div className="card-content">
              <div className="card-icon-section">
                <IconComponent className={`card-icon ${colorClasses.icon}`} />
              </div>
              
              <div className="card-info">
                <p className="card-title">{card.title}</p>
                <p className={`card-value ${colorClasses.value}`}>{card.value}</p>
                {card.description && (
                  <p className={`card-description ${colorClasses.desc}`}>
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;