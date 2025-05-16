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
import { CHECKOUT } from '../../router/Router';


export default function Cart() {
  const { client } = useClientContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // For shipping, coupon, etc.
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [coupon, setCoupon] = useState('');

  // 1. Define fetchCart FIRST
  const fetchCart = async () => {
    setLoading(true);
    const res = await CartService.getCart(client.id);
    setItems(res.data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    if (client.id) fetchCart();
  }, [client.id]);

  const shipping = 7.5;
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const total = subtotal + shipping;

  // 2. Now define handlers that use fetchCart
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await CartService.updateQuantity(itemId, newQuantity);
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    await CartService.removeItem(itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = async () => {
    await CartService.clearCart(client.id);
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
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
              <div>Loading...</div>
            ) : items.length === 0 ? (
              <p>No items in your cart.</p>
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
                              <div className="font-semibold">{item.product?.name}</div>
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
                          >🗑️</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="w-full md:w-96 flex-shrink-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calculated Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-2">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">USA</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-1/2"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <Button variant="outline" className="w-full mb-2">
                Update
              </Button>
              <h3 className="font-semibold mb-2">Coupon Code</h3>
              <div className="flex gap-2 mb-2">
                <Input
                  className="flex-1"
                  placeholder="Enter code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
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
                <div className="flex justify-between font-bold text-lg">
                  <span>Cart Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button onClick={()=>navigate(CHECKOUT)} className="mt-6 w-full" variant="default">
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-2">
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full">🚚</span>
                <span className="text-xs font-semibold">Free Shipping</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full">📞</span>
                <span className="text-xs font-semibold">Call Us Anytime</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full">💬</span>
                <span className="text-xs font-semibold">Chat With Us</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-2 p-3">
                <span className="bg-amber-100 p-2 rounded-full">🎁</span>
                <span className="text-xs font-semibold">Gift Cards</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
