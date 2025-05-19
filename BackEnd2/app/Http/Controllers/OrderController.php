<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingAddress;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['client', 'products', 'items', 'shippingAddress'])->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            // Validate order data
            $validatedData = $request->validate([
                'client_id' => 'required|exists:clients,id',
                'total_amount' => 'required|numeric|min:0',
                'shipping_address' => 'required|array',
                'shipping_address.full_name' => 'required|string|max:255',
                'shipping_address.address_line1' => 'required|string|max:255',
                'shipping_address.address_line2' => 'nullable|string|max:255',
                'shipping_address.city' => 'required|string|max:255',
                'shipping_address.state' => 'nullable|string|max:255',
                'shipping_address.postal_code' => 'required|string|max:20',
                'shipping_address.country' => 'required|string|max:255',
                'shipping_address.phone_number' => 'nullable|string|max:20',
            ]);

            // Create order
            $order = Order::create([
                'client_id' => $validatedData['client_id'],
                'status' => 'pending',
                'total_amount' => $validatedData['total_amount'],
            ]);

            // Create shipping address
            $shippingAddress = new ShippingAddress($validatedData['shipping_address']);
            $shippingAddress->order_id = $order->id;
            $shippingAddress->save();

            // Get cart items and create order items
            $cartItems = CartItem::with('product')
                ->where('client_id', $validatedData['client_id'])
                ->get();

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);
            }

            // Clear the cart
            CartItem::where('client_id', $validatedData['client_id'])->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load(['shippingAddress', 'items.product'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['client', 'products', 'items', 'shippingAddress'])->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);
        
        $validatedData = $request->validate([
            'status' => 'sometimes|required|in:pending,processing,shipped,delivered,cancelled',
            'total_amount' => 'sometimes|required|numeric|min:0'
        ]);

        $order->update($validatedData);
        return response()->json($order->load(['shippingAddress', 'items.product']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    /**
     * Get orders for a specific client.
     */
    public function getClientOrders(string $clientId)
    {
        $orders = Order::with(['products', 'items', 'shippingAddress'])
            ->where('client_id', $clientId)
            ->get();
        return response()->json($orders);
    }
    public function get_id(){
        $order_id = Order::latest('id')->get();
        return response()->json($order_id);
    }
} 