<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Get the current user's cart or create one if it doesn't exist
     */
    public function index(Request $request)
    {
        $cart = $this->getOrCreateCart($request);
        
        // Load related products with their details
        $cart->load('items.product');
        
        // Add the total price
        $data = $cart->toArray();
        $data['total'] = $cart->total;
        
        return response()->json($data);
    }
    
    /**
     * Add a product to the cart
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'selected_size' => 'nullable|string',
            'selected_color' => 'nullable|string',
        ]);

        $cart = $this->getOrCreateCart($request);
        $product = Product::findOrFail($request->product_id);
        
        // Check if product is already in cart with the same options
        $item = $cart->items()
            ->where('product_id', $request->product_id)
            ->where('selected_size', $request->selected_size)
            ->where('selected_color', $request->selected_color)
            ->first();
            
        if ($item) {
            // If item exists, update the quantity
            $item->increment('quantity', $request->quantity);
        } else {
            // Otherwise create a new item
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'selected_size' => $request->selected_size,
                'selected_color' => $request->selected_color,
            ]);
        }
        
        return response()->json([
            'message' => 'Product added to cart',
            'cart_count' => $cart->items()->sum('quantity')
        ]);
    }
    
    /**
     * Update the quantity of an item in the cart
     */
    public function updateQuantity(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);
        
        $cart = $this->getOrCreateCart($request);
        
        $item = $cart->items()->findOrFail($itemId);
        $item->update(['quantity' => $request->quantity]);
        
        return response()->json([
            'message' => 'Quantity updated',
            'cart_count' => $cart->items()->sum('quantity')
        ]);
    }
    
    /**
     * Remove an item from the cart
     */
    public function remove(Request $request, $itemId)
    {
        $cart = $this->getOrCreateCart($request);
        
        $item = $cart->items()->findOrFail($itemId);
        $item->delete();
        
        return response()->json([
            'message' => 'Item removed from cart',
            'cart_count' => $cart->items()->sum('quantity')
        ]);
    }
    
    /**
     * Clear the entire cart
     */
    public function clear(Request $request)
    {
        $cart = $this->getOrCreateCart($request);
        $cart->items()->delete();
        
        return response()->json([
            'message' => 'Cart cleared',
            'cart_count' => 0
        ]);
    }
    
    /**
     * Helper method to get the current cart or create a new one
     */
    protected function getOrCreateCart(Request $request)
    {
        if (auth()->check()) {
            // For authenticated users, get or create their cart
            return Cart::firstOrCreate(['user_id' => auth()->id()]);
        } else {
            // For guests, use session ID to track the cart
            $sessionId = $request->cookie('cart_session_id');
            
            if (!$sessionId) {
                $sessionId = Str::uuid()->toString();
                // We'll set the cookie in the response
                cookie()->queue('cart_session_id', $sessionId, 60*24*30); // 30 days
            }
            
            return Cart::firstOrCreate(['session_id' => $sessionId]);
        }
    }
}
