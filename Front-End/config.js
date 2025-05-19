// API Configuration
export const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';

// Other configuration constants
export const APP_NAME = 'Your Store Name';
export const CURRENCY = 'USD';
export const SHIPPING_COST = 7.5;

// Feature flags
export const FEATURES = {
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_COUPONS: true,
  ENABLE_UPSELL: true
};

// Payment configuration
export const PAYMENT_CONFIG = {
  CURRENCY: 'USD',
  MIN_ORDER_AMOUNT: 10,
  MAX_ORDER_AMOUNT: 1000
};

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/yourstore',
  INSTAGRAM: 'https://instagram.com/yourstore',
  TWITTER: 'https://twitter.com/yourstore'
};

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'support@yourstore.com',
  PHONE: '+1 234 567 890',
  ADDRESS: '123 Store Street, City, Country'
}; 