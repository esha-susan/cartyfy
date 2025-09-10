import { Offer, Store, PurchaseHistory } from '@/types/interfaces';

export const mockOffers: Offer[] = [
  {
    id: '1',
    itemName: 'Rice (1kg)',
    store: 'Big Bazaar',
    price: 45,
    originalPrice: 60,
    discount: 25,
    distance: '0.5 km',
    rating: 4.2,
    availability: 'In Stock',
    bestTime: 'Morning (9-11 AM)',
    category: 'Staples',
    brand: 'India Gate',
    imageUrl: '/images/rice.jpg'
  },
  {
    id: '2',
    itemName: 'Rice (1kg)',
    store: 'Reliance Fresh',
    price: 52,
    originalPrice: 60,
    discount: 13,
    distance: '1.2 km',
    rating: 4.5,
    availability: 'In Stock',
    bestTime: 'Evening (5-7 PM)',
    category: 'Staples',
    brand: 'Fortune',
    imageUrl: '/images/rice.jpg'
  },
  {
    id: '3',
    itemName: 'Milk (1L)',
    store: 'Mother Dairy',
    price: 55,
    originalPrice: 55,
    discount: 0,
    distance: '0.3 km',
    rating: 4.8,
    availability: 'In Stock',
    bestTime: 'Morning (6-8 AM)',
    category: 'Dairy',
    brand: 'Mother Dairy',
    imageUrl: '/images/milk.jpg'
  },
  {
    id: '4',
    itemName: 'Milk (1L)',
    store: 'DMart',
    price: 53,
    originalPrice: 58,
    discount: 9,
    distance: '1.8 km',
    rating: 4.3,
    availability: 'In Stock',
    bestTime: 'Afternoon (2-4 PM)',
    category: 'Dairy',
    brand: 'Amul',
    imageUrl: '/images/milk.jpg'
  },
  {
    id: '5',
    itemName: 'Onions (1kg)',
    store: 'Local Vegetable Market',
    price: 30,
    originalPrice: 35,
    discount: 14,
    distance: '0.7 km',
    rating: 4.0,
    availability: 'In Stock',
    bestTime: 'Morning (7-9 AM)',
    category: 'Vegetables',
    brand: 'Local',
    imageUrl: '/images/onions.jpg'
  },
  {
    id: '6',
    itemName: 'Bread (400g)',
    store: 'More Supermarket',
    price: 22,
    originalPrice: 25,
    discount: 12,
    distance: '1.0 km',
    rating: 4.1,
    availability: 'In Stock',
    bestTime: 'Evening (6-8 PM)',
    category: 'Bakery',
    brand: 'Harvest Gold',
    imageUrl: '/images/bread.jpg'
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Big Bazaar',
    address: 'Mall Road, Sector 5, New Delhi',
    distance: '0.5 km',
    rating: 4.2,
    isOpen: true,
    openingHours: {
      open: '09:00',
      close: '22:00'
    },
    deliveryAvailable: true,
    deliveryFee: 30
  },
  {
    id: '2',
    name: 'Reliance Fresh',
    address: 'MG Road, Central Market, New Delhi',
    distance: '1.2 km',
    rating: 4.5,
    isOpen: true,
    openingHours: {
      open: '08:00',
      close: '23:00'
    },
    deliveryAvailable: true,
    deliveryFee: 25
  },
  {
    id: '3',
    name: 'Mother Dairy',
    address: 'Community Center, Block A, New Delhi',
    distance: '0.3 km',
    rating: 4.8,
    isOpen: true,
    openingHours: {
      open: '06:00',
      close: '22:00'
    },
    deliveryAvailable: false
  },
  {
    id: '4',
    name: 'DMart',
    address: 'Express Highway, Sector 10, New Delhi',
    distance: '1.8 km',
    rating: 4.3,
    isOpen: true,
    openingHours: {
      open: '08:00',
      close: '22:00'
    },
    deliveryAvailable: true,
    deliveryFee: 40
  }
];

export const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    items: [
      { id: '1', name: 'Rice', quantity: '5', unit: 'kg' },
      { id: '2', name: 'Milk', quantity: '2', unit: 'L' },
      { id: '3', name: 'Onions', quantity: '2', unit: 'kg' }
    ],
    totalAmount: 285,
    totalSavings: 65,
    stores: ['Big Bazaar', 'Mother Dairy']
  },
  {
    id: '2',
    date: '2024-01-08',
    items: [
      { id: '4', name: 'Bread', quantity: '3', unit: 'pcs' },
      { id: '5', name: 'Eggs', quantity: '30', unit: 'pcs' },
      { id: '6', name: 'Oil', quantity: '1', unit: 'L' }
    ],
    totalAmount: 420,
    totalSavings: 45,
    stores: ['Reliance Fresh', 'Local Market']
  }
];

// Helper functions for mock data
export const getOffersByItem = (itemName: string): Offer[] => {
  return mockOffers.filter(offer => 
    offer.itemName.toLowerCase().includes(itemName.toLowerCase())
  );
};

export const getStoreById = (storeId: string): Store | undefined => {
  return mockStores.find(store => store.id === storeId);
};

export const calculateTotalSavings = (offers: Offer[]): number => {
  return offers.reduce((total, offer) => total + (offer.originalPrice - offer.price), 0);
};

export const getNearestStore = (offers: Offer[]): string => {
  if (offers.length === 0) return '';
  
  const storeDistances = offers.map(offer => ({
    store: offer.store,
    distance: parseFloat(offer.distance.split(' ')[0])
  }));
  
  const nearest = storeDistances.reduce((min, current) => 
    current.distance < min.distance ? current : min
  );
  
  return `${nearest.store} (${nearest.distance} km)`;
};

export const getBestShoppingTime = (offers: Offer[]): string => {
  // Simple logic to find most common time slot
  const timeSlots = offers.map(offer => offer.bestTime);
  const timeCount: { [key: string]: number } = {};
  
  timeSlots.forEach(time => {
    timeCount[time] = (timeCount[time] || 0) + 1;
  });
  
  const mostCommon = Object.entries(timeCount).reduce((a, b) => 
    timeCount[a[0]] > timeCount[b[0]] ? a : b
  );
  
  return mostCommon[0];
};