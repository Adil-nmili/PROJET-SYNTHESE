import { useEffect, useState } from 'react';
import CartService from '../../../service/Cart';
import { useClientContext } from '../../../api/context/ClientContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom'
import { CHECKOUT, ALLPRODUCTS } from '../../router/Router';
import { Contact, Gift, PhoneCall, Trash, Truck, ArrowLeft } from 'lucide-react';


export default function Cart() {
  const { client } = useClientContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(false)
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await CartService.getCart(client.id);
      setItems(res.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (client.id) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [client.id]);

  const shipping = 7.5;
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    setTotal(subtotal + shipping);
  }, [subtotal, shipping]);

  const handleAddCoupon = () => {
    if (coupon !== '') {
      setTotal((subtotal + shipping) * 0.85);
      setDiscount(true)
    } else {
      setTotal(subtotal + shipping);
    }
  };

  // 2. Now define handlers that use fetchCart
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await CartService.updateQuantity(itemId, newQuantity);
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    // Dispatch cart-updated event
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleRemoveItem = async (itemId) => {
    await CartService.removeItem(itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
    // Dispatch cart-updated event
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleClearCart = async () => {
    await CartService.clearCart(client.id);
    setItems([]);
    // Dispatch cart-updated event
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="mt-10 mx-auto flex flex-col md:flex-row gap-8 px-8">
        <div className="w-full">
          <Button
            variant="outline"
            onClick={() => navigate(ALLPRODUCTS)}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          {/* Cart Table */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Shopping Bag</CardTitle>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">{items.length} items in your bag.</p>
                {items.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your shopping bag is empty</p>
                  <Button onClick={() => navigate(ALLPRODUCTS)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <img
                                src={item.product?.images ? JSON.parse(item.product.images)[0] : ""}
                                alt={item.product?.name}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div>
                                <div className="font-semibold truncate-cell">{item.product?.name}</div>
                                <div className="text-xs text-gray-500">
                                  Color: {item.color} | Size: {item.size || "N/A"}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>${Number(item.product?.price).toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >-</Button>
                              <span className="px-2">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >+</Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-amber-600">
                            ${(item.product?.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleRemoveItem(item.id)}
                            ><Trash />  </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-96 flex-shrink-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calculated Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              {!loading && items.length > 0 && (
                <>
                  <h3 className="font-semibold mb-2">Coupon Code</h3>
                  <div className="flex gap-2 mb-2">
                    <Input
                      type='text'
                      className="flex-1"
                      placeholder="Enter code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleAddCoupon}>Apply</Button>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Cart Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    {discount && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Discount (15%)</span>
                        <span>-${((subtotal + shipping) * 0.15).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Cart Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button onClick={()=>navigate(CHECKOUT)} className="mt-6 w-full" variant="default">
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-2">
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full"><Truck /></span>
                <span className="text-xs font-semibold">Free Shipping</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full"><PhoneCall /></span>
                <span className="text-xs font-semibold">Call Us Anytime</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full"><Contact /></span>
                <span className="text-xs font-semibold">Chat With Us</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full"><Gift /></span>
                <span className="text-xs font-semibold">Gift Cards</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
