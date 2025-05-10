<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'products', 'items'])->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'status' => 'sometimes|in:pending,processing,completed,cancelled',
            'total_amount' => 'sometimes|numeric|min:0',
        ]);

        $order = Order::create($validatedData);
        return response()->json($order, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['user', 'products', 'items'])->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        
        $validatedData = $request->validate([
            'status' => 'sometimes|required|in:pending,processing,completed,cancelled',
            'total_amount' => 'sometimes|required|numeric|min:0'
        ]);

        $order->update($validatedData);
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order ' . $order->id . ' deleted successfully']);
    }

    /**
     * Get orders for a specific user.
     */
    public function getUserOrders(string $userId)
    {
        $orders = Order::with(['products', 'items'])
            ->where('user_id', $userId)
            ->get();
        return response()->json($orders);
    }
    
    /**
     * Create a new order from the user's cart.
     */
    public function checkout(Request $request)
    {
        try {
            // Validate request data
            $validatedData = $request->validate([
                'firstName' => 'required|string',
                'lastName' => 'sometimes|string',
                'companyName' => 'nullable|string',
                'streetAddress' => 'required|string',
                'apartment' => 'nullable|string',
                'townCity' => 'required|string',
                'stateCounty' => 'nullable|string',
                'zipPostcode' => 'nullable|string',
                'phoneNumber' => 'required|string',
                'emailAddress' => 'required|email',
                'paymentMethod' => 'required|string|in:paypal,credit_card,bank_transfer',
                'saveInfo' => 'sometimes|boolean',
                'notes' => 'nullable|string',
            ]);
            
            DB::beginTransaction();
            
            // Get the user's cart
            $userId = Auth::id();
            $cart = Cart::where('user_id', $userId)->first();
            
            if (!$cart) {
                // Handle guest checkout with cookie
                $cartId = $request->cookie('cart_id');
                if ($cartId) {
                    $cart = Cart::where('cart_id', $cartId)->first();
                }
            }
            
            if (!$cart || !$cart->items || $cart->items->isEmpty()) {
                return response()->json([
                    'message' => 'Your cart is empty'
                ], 400);
            }
            
            // Calculate the total amount from cart items
            $totalAmount = 0;
            foreach ($cart->items as $item) {
                $totalAmount += $item->product->price * $item->quantity;
            }
            
            // Create a new order
            $order = new Order();
            $order->user_id = $userId ?? null;
            $order->status = 'pending';
            $order->total_amount = $totalAmount;
            $order->billing_first_name = $validatedData['firstName'];
            $order->billing_last_name = $validatedData['lastName'] ?? '';
            $order->billing_company = $validatedData['companyName'] ?? '';
            $order->billing_address = $validatedData['streetAddress'];
            $order->billing_apartment = $validatedData['apartment'] ?? '';
            $order->billing_city = $validatedData['townCity'];
            $order->billing_state = $validatedData['stateCounty'] ?? '';
            $order->billing_postcode = $validatedData['zipPostcode'] ?? '';
            $order->billing_phone = $validatedData['phoneNumber'];
            $order->billing_email = $validatedData['emailAddress'];
            $order->payment_method = $validatedData['paymentMethod'];
            $order->notes = $validatedData['notes'] ?? '';
            $order->save();
            
            // Create order items from cart items
            foreach ($cart->items as $cartItem) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $cartItem->product_id;
                $orderItem->quantity = $cartItem->quantity;
                $orderItem->price = $cartItem->product->price;
                
                if ($cartItem->selected_size) {
                    $orderItem->selected_size = $cartItem->selected_size;
                }
                
                if ($cartItem->selected_color) {
                    $orderItem->selected_color = $cartItem->selected_color;
                }
                
                $orderItem->save();
                
                // Update product stock if needed
                // $product = Product::find($cartItem->product_id);
                // $product->stock -= $cartItem->quantity;
                // $product->save();
            }
            
            // Clear the cart after successful order
            CartItem::where('cart_id', $cart->id)->delete();
            
            DB::commit();
            
            return response()->json([
                'message' => 'Order created successfully',
                'order' => Order::with('items.product')->findOrFail($order->id)
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Process payment for an order
     */
    public function processPayment(Request $request, $orderId)
    {
        try {
            $order = Order::findOrFail($orderId);
            
            // In a real app, you would integrate with a payment gateway here
            // For this demo, we'll simulate a successful payment
            
            $order->status = 'processing';
            $order->payment_status = 'paid';
            $order->save();
            
            return response()->json([
                'message' => 'Payment processed successfully',
                'order' => $order
            ]);
            
        } catch (\Exception $e) {
            Log::error('Payment processing error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Payment processing failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Apply coupon code
     */
    public function applyCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string'
        ]);
        
        // In a real app, you would check against valid coupon codes in the database
        // For this demo, we'll simulate that all codes are invalid
        
        return response()->json([
            'message' => 'Invalid coupon code or coupon has expired',
        ], 400);
    }
}