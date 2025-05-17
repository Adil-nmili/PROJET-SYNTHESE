import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { STORE } from '../../router/Router';
import { useClientContext } from '../../../api/context/ClientContext';
import { useCartContext } from '../../../api/context/CartContext';
import Order from '../../../service/Order';
// shadcn/ui components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [phoneError, setPhoneError] = useState('');
  const { client } = useClientContext();
  const { cart, clearCart } = useCartContext();
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [note, setNote] = useState('');

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    streetAddress: '',
    townCity: '',
    stateCounty: '',
    deliveryDate: '',
    zipPostcode: ''
  });

  useEffect(() => {
    if (!cart) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [cart]);

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

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    const subtotal = cart.items.reduce((sum, item) => 
      sum + (item.product?.price || 0) * item.quantity, 0
    );
    const shipping = 7.5;
    return subtotal + shipping;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(billingInfo.phoneNumber)) {
      setPhoneError('Please enter a valid Moroccan phone number starting with 05, 06, or 07');
      return;
    }

    setProcessing(true);
    try {
      const orderData = {
        client_id: client.id,
        total_amount: calculateTotal(),
        shipping_address: {
          full_name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          address_line1: billingInfo.streetAddress,
          address_line2: '',
          city: billingInfo.townCity,
          state: billingInfo.stateCounty,
          postal_code: billingInfo.zipPostcode,
          country: 'Morocco',
          phone_number: billingInfo.phoneNumber
        }
      };

      const response = await Order.create(orderData);
      
      if (response.status === 201) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate(STORE, { 
          state: { 
            orderSuccess: true, 
            orderId: response.data.order.id 
          } 
        });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Could not place your order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-900 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={billingInfo.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={billingInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {phoneError && (
                  <p className="text-sm text-red-500">{phoneError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={billingInfo.streetAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="townCity">Town/City</Label>
                <Input
                  id="townCity"
                  name="townCity"
                  value={billingInfo.townCity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stateCounty">State/County</Label>
                <Input
                  id="stateCounty"
                  name="stateCounty"
                  value={billingInfo.stateCounty}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipPostcode">ZIP/Postcode</Label>
                <Input
                  id="zipPostcode"
                  name="zipPostcode"
                  value={billingInfo.zipPostcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart?.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${cart?.items?.reduce((sum, item) => 
                      sum + (item.product?.price || 0) * item.quantity, 0
                    ).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>$7.50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total (USD):</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full text-white py-3 text-lg font-semibold rounded"
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Confirm Order'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default Checkout;