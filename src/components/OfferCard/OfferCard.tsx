import React from 'react';

import {Star,MapPin,Clock,Package} from'lucide-react';
import {Offer} from '@/types/interfaces';

//props definition
interface OfferCardProps{
    offer:Offer;
    onSelect?:(offer:Offer)=>void;
    isSelected?:boolean;
}
//component definition
const OfferCard:React.FC<OfferCardProps>=({
    offer,onSelect,
    isSelected=false
})=>{
const handleClick=()=>{
    if(onSelect){
        onSelect(offer);
    }
};
const getAvailabilityColor=(availability:string)=>{
    switch(availability){
        case 'In stock':
            return 'text-green-600 bg-green-100';
            case 'Limited Stock':
            return 'text-yellow-600 bg-yellow-100';
            case 'Out of Stock':
            return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg gray-100';
    }
};
return (
    <div 
      className={`offer-card ${isSelected ? 'offer-card-selected' : ''}`}
      onClick={handleClick}
    >
      <div className="offer-content">
        <div className="offer-header">
          <div className="offer-item-info">
            <h4 className="item-name">{offer.itemName}</h4>
            <div className="store-info">
              <span className="store-name">{offer.store}</span>
              <div className="store-details">
                <MapPin className="location-icon" />
                <span className="distance">{offer.distance}</span>
              </div>
            </div>
          </div>
          
          <div className="price-section">
            <div className="price-display">
              <span className="current-price">₹{offer.price}</span>
              {offer.discount > 0 && (
                <span className="original-price">₹{offer.originalPrice}</span>
              )}
            </div>
            {offer.discount > 0 && (
              <span className="discount-badge">
                {offer.discount}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="offer-metadata">
          <div className="metadata-item">
            <Star className="metadata-icon star-icon" />
            <span className="rating">{offer.rating}</span>
          </div>
          
          <div className="metadata-item">
            <Package className="metadata-icon" />
            <span className={`availability ${getAvailabilityColor(offer.availability)}`}>
              {offer.availability}
            </span>
          </div>
          
          <div className="metadata-item">
            <Clock className="metadata-icon" />
            <span className="best-time">{offer.bestTime}</span>
          </div>
        </div>

        {offer.brand && (
          <div className="brand-info">
            <span className="brand-label">Brand:</span>
            <span className="brand-name">{offer.brand}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;