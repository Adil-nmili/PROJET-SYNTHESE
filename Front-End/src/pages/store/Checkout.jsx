import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { STORE } from '../../router/Router';
import { useClientContext } from '../../../api/context/ClientContext';
import { useCartContext } from '../../../api/context/CartContext';
import Order from '../../../service/Order';
import ProductService from '../../../service/Product';
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
import { CreditCard, Wallet, Banknote } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import OrderSuccess from '@/components/OrderSuccess';
import UpsellProducts from '@/components/UpsellProducts';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [phoneError, setPhoneError] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [showPaypalDialog, setShowPaypalDialog] = useState(false);
  const [isPaypalVerified, setIsPaypalVerified] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [isCardVerified, setIsCardVerified] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const { client } = useClientContext();
  const { 
    cart, 
    clearCart, 
    discountType,
    discountValue,
    isFreeShipping,
    calculateSubtotal,
    calculateDiscount,
    calculateShipping,
    calculateTotal,
    coupon
  } = useCartContext();

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

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState([]);

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
        payment_method: paymentMethod,
        coupon_code: coupon,
        discount_amount: calculateDiscount(calculateSubtotal()),
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
        setOrderSuccess(true);
        
        // Fetch upsell products
        try {
          const productsResponse = await ProductService.getUpsellProducts();
          setUpsellProducts(productsResponse.data);
        } catch (error) {
          console.error('Error fetching upsell products:', error);
        }
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

  const handlePaypalVerification = async () => {
    // Here you would typically make an API call to verify the PayPal email
    // For demo purposes, we'll just simulate a verification
    setProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll consider any email with @paypal.com as valid
      const isValid = paypalEmail.includes('@paypal.com');
      
      if (isValid) {
        setIsPaypalVerified(true);
        setShowPaypalDialog(false);
        toast.success('PayPal email verified successfully!');
      } else {
        toast.error('Invalid PayPal email. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to verify PayPal email. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCardVerification = async () => {
    setProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      const isValid = 
        cardInfo.cardNumber.replace(/\s/g, '').length === 16 &&
        /^\d{2}\/\d{2}$/.test(cardInfo.expiryDate) &&
        /^\d{3,4}$/.test(cardInfo.cvv) &&
        cardInfo.cardholderName.trim().length > 0;
      
      if (isValid) {
        setIsCardVerified(true);
        setShowCardDialog(false);
        toast.success('Card information verified successfully!');
      } else {
        toast.error('Invalid card information. Please check and try again.');
      }
    } catch (error) {
      toast.error('Failed to verify card information. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    if (value === 'paypal') {
      setShowPaypalDialog(true);
      setIsCardVerified(false);
    } else if (value === 'credit_card') {
      setShowCardDialog(true);
      setIsPaypalVerified(false);
    } else {
      setIsPaypalVerified(false);
      setIsCardVerified(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const renderDiscountInfo = () => {
    if (!coupon) return null;

    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount(subtotal);

    switch (discountType) {
      case 'percentage':
        return (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({discountValue}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        );
      case 'fixed_amount':
        return (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount (Fixed Amount)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        );
      case 'free_shipping':
        return (
          <div className="flex justify-between text-sm text-green-600">
            <span>Free Shipping Applied</span>
            <span>-${calculateShipping().toFixed(2)}</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (orderSuccess) {
    return (
      <>
        <OrderSuccess orderId={Number(Order.getLastOrderId) + 1} />
        {upsellProducts.length > 0 && <UpsellProducts products={upsellProducts} />}
      </>
    );
  }

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
          <div className="space-y-8">
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

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-5 h-5" />
                      <span>Credit Card</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="w-5 h-5" />
                      <span>PayPal</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                    <Label htmlFor="cash_on_delivery" className="flex items-center gap-2 cursor-pointer">
                      <Banknote className="w-5 h-5" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Payment Method Specific Fields */}
                {paymentMethod === 'credit_card' && (
                  <div className="mt-4 space-y-4">
                    {isCardVerified ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-sm">Card verified ending in {cardInfo.cardNumber.slice(-4)}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Please verify your card information to continue.
                      </p>
                    )}
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    {isPaypalVerified ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-sm">PayPal email verified: {paypalEmail}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Please verify your PayPal email to continue.
                      </p>
                    )}
                  </div>
                )}

                {paymentMethod === 'cash_on_delivery' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Pay with cash upon delivery. Please have the exact amount ready.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

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
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  {renderDiscountInfo()}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total (USD):</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white py-3 text-lg font-semibold rounded mt-4"
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : `Pay ${calculateTotal().toFixed(2)} USD`}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PayPal Verification Dialog */}
      <AlertDialog open={showPaypalDialog} onOpenChange={setShowPaypalDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify PayPal Email</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your PayPal email address to continue with the payment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              type="email"
              placeholder="Enter your PayPal email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePaypalVerification}
              disabled={processing || !paypalEmail}
            >
              {processing ? 'Verifying...' : 'Verify Email'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Credit Card Verification Dialog */}
      <AlertDialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Card Information</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your credit card details to continue with the payment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardInfo.cardholderName}
                onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardInfo.cardNumber}
                onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: formatCardNumber(e.target.value) })}
                maxLength={19}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardInfo.expiryDate}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: formatExpiryDate(e.target.value) })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardInfo.cvv}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCardVerification}
              disabled={processing || !cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv || !cardInfo.cardholderName}
            >
              {processing ? 'Verifying...' : 'Verify Card'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default Checkout;