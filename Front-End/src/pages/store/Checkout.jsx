import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Order from '../../../service/Order';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [phoneError, setPhoneError] = useState('');
  
  // Example cart items with Lakers products
  const exampleCart = {
    items: [
      {
        id: 1,
        product: {
          id: 1,
          name: "Lakers Home Jersey",
          price: 119.99,
          images: JSON.stringify(["/storePromoImage/image4.png"]),
          product_code: "LAK-001"
        },
        quantity: 1,
        selected_size: "L",
        selected_color: "Purple"
      },
      {
        id: 2,
        product: {
          id: 2,
          name: "Lakers Cap",
          price: 34.99,
          images: JSON.stringify(["/storePromoImage/image5.png"]),
          product_code: "LAK-022"
        },
        quantity: 2,
        selected_color: "Black"
      }
    ]
  };
  
  const [cart] = useState(exampleCart);
  
  const [billingInfo, setBillingInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john@example.com',
    phoneNumber: '0612345678',
    streetAddress: '123 Lakers Ave',
    townCity: 'Los Angeles',
    stateCounty: 'Casablanca', 
    zipPostcode: '90001'
  });

  const validatePhoneNumber = (phone) => {
   
    const phoneRegex = /^(0[567])[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phoneNumber') {
      
      setPhoneError('');
      
     
      const phoneValue = value.replace(/[^0-9]/g, '');
      
      setBillingInfo({
        ...billingInfo,
        [name]: phoneValue
      });
      
   
      if (phoneValue.length === 10 && !validatePhoneNumber(phoneValue)) {
        setPhoneError('Please enter a valid Moroccan phone number starting with 05, 06, or 07');
      }
    } else {
      setBillingInfo({
        ...billingInfo,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    if (!validatePhoneNumber(billingInfo.phoneNumber)) {
      setPhoneError('Please enter a valid Moroccan phone number starting with 05, 06, or 07');
      return;
    }
    
    setProcessing(true);
    
    try {
   
      setTimeout(() => {
        toast.success('Order placed successfully!');
        toast.success('Payment processed successfully!');
        navigate('/store', { 
          state: { orderSuccess: true, orderId: 123456 } 
        });
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Could not place your order. Please try again.');
      setProcessing(false);
    }
  };
  
  const subtotal = cart?.items?.reduce(
    (total, item) => total + item.quantity * item.product?.price,
    0
  ) || 0;
  
  const shipping = 0; 
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-32 min-h-[70vh] flex items-center justify-center">
        <div className="text-purple-900 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-900 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-xl">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24 min-h-[70vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Link to="/store/cart">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Cart
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Simplified Billing Form */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm mb-1">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm mb-1">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="streetAddress" className="block text-sm mb-1">Street Address*</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={billingInfo.streetAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="townCity" className="block text-sm mb-1">City*</label>
                  <input
                    type="text"
                    id="townCity"
                    name="townCity"
                    value={billingInfo.townCity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="stateCounty" className="block text-sm mb-1">region*</label>
                  <select
                    id="stateCounty"
                    name="stateCounty"
                    value={billingInfo.stateCounty}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option >Tanger-Tétouan-Al Hoceïma</option>
                    <option >L'Oriental</option>
                    <option >Fès-Meknès</option>
                    <option >Rabat-Salé-Kénitra</option>
                    <option >Béni Mellal-Khénifra</option>
                    <option >Casablanca-Settat</option>
                    <option >Marrakech-Safi</option>
                    <option >Drâa-Tafilalet</option>
                    <option >Souss-Massa</option>
                    <option >Laâyoune-Sakia El Hamra</option>
                    <option >Guelmim-Oued Noun</option>
                    <option >Dakhla-Oued Ed Dahab</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipPostcode" className="block text-sm mb-1">ZIP Code*</label>
                  <input
                    type="text"
                    id="zipPostcode"
                    name="zipPostcode"
                    value={billingInfo.zipPostcode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm mb-1">Phone* (05/06/07 + 8 digits)</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={billingInfo.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${phoneError ? 'border-red-500' : ''}`}
                    required
                    maxLength="10"
                    placeholder="0612345678"
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="emailAddress" className="block text-sm mb-1">Email*</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={billingInfo.emailAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart?.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-md">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <img 
                      src={item.product?.images ? JSON.parse(item.product.images)[0] : "/logo.png"} 
                      alt={item.product?.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {e.target.src = "/logo.png"}}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.selected_size && `Size: ${item.selected_size}`}
                      {item.selected_color && item.selected_size && ' | '}
                      {item.selected_color && `Color: ${item.selected_color}`}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold">${(item.product?.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Order Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="mb-6">
              <div className="space-y-2">
                <label className="flex items-center p-2 border rounded cursor-pointer bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span className="flex-grow">PayPal</span>
                </label>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;