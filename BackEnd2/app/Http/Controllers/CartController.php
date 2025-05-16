<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;

use Illuminate\Http\Request;

class CartController extends Controller
{
    // Show the cart with items for a given client
    public function show($clientId)
    {
        $cart = Cart::where('client_id', $clientId)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found for this client'], 404);
        }

        // Fetch items by client_id
        $items = CartItem::with('product')->where('client_id', $clientId)->get();

        return response()->json([
            'cart' => $cart,
            'items' => $items
        ]);
    }

    // Create a new cart for a client (optional if you want this explicit)
    public function createCart(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
        ]);

        $cart = Cart::firstOrCreate(['client_id' => $request->client_id]);

        return response()->json(['message' => 'Cart created or already exists', 'cart' => $cart]);
    }

    // Remove entire cart (optional)
    public function destroy($clientId)
    {
        $cart = Cart::where('client_id', $clientId)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }
        $cart->delete();

        return response()->json(['message' => 'Cart deleted successfully']);
    }

    public function clearCart($clientId)
    {
       
        CartItem::where('client_id', $clientId)->delete();

        // Optionally, you can also delete the cart itself if you want:
        // \App\Models\Cart::where('client_id', $clientId)->delete();

        return response()->json(['message' => 'Cart cleared successfully']);
    }
}
