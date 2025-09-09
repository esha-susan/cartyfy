// Core interfaces for the Smart Purchase Optimizer

export interface GroceryItem {
    id: string;
    name: string;
    quantity: string;
    unit: 'kg' | 'L' | 'pcs' | 'pack' | 'gm' | 'ml';
  }
  
  export interface Offer {
    id: string;
    itemName: string;
    store: string;
    price: number;
    originalPrice: number;
    discount: number;
    distance: string;
    rating: number;
    availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
    bestTime: string;
    category?: string;
    brand?: string;
    imageUrl?: string;
  }
  
  export interface Store {
    id: string;
    name: string;
    address: string;
    distance: string;
    rating: number;
    isOpen: boolean;
    openingHours: {
      open: string;
      close: string;
    };
    deliveryAvailable: boolean;
    deliveryFee?: number;
  }
  
  export interface PurchaseHistory {
    id: string;
    date: string;
    items: GroceryItem[];
    totalAmount: number;
    totalSavings: number;
    stores: string[];
  }
  
  export interface UserPreferences {
    preferredStores: string[];
    maxDistance: number;
    budgetLimit: number;
    prioritizeDelivery: boolean;
    prioritizeSavings: boolean;
  }
  
  export interface OptimizationResult {
    offers: Offer[];
    totalSavings: number;
    nearestStore: string;
    bestShoppingTime: string;
    recommendations: string[];
  }
  
  // API Response types
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
  }
  
  export interface LocationData {
    address: string;
    pincode: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }
  
  // Form types
  export interface OptimizeRequest {
    groceryList: GroceryItem[];
    location: LocationData;
    budget?: number;
    preferences?: Partial<UserPreferences>;
  }
  
  // Component Props
  export interface OfferCardProps {
    offer: Offer;
    onSelect?: (offer: Offer) => void;
    isSelected?: boolean;
  }
  
  export interface GroceryListProps {
    items: GroceryItem[];
    onItemAdd: (item: Omit<GroceryItem, 'id'>) => void;
    onItemRemove: (id: string) => void;
    onItemUpdate: (id: string, item: Partial<GroceryItem>) => void;
  }
  
  export interface SummaryCardsProps {
    totalSavings: number;
    nearestStore: string;
    bestShoppingTime: string;
    totalItems: number;
  }