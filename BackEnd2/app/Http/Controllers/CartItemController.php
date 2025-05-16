<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    // Add a product to the client's cart
    public function add(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'color' => 'nullable|string|max:255',
        ]);

        $cart = Cart::firstOrCreate(['client_id' => $request->client_id]);

        $existingItem = CartItem::where('client_id', $cart->client_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingItem) {
            // Optionally update quantity instead of rejecting
            $existingItem->quantity += $request->quantity;
            $existingItem->color = $request->color; // update color if needed
            $existingItem->save();

            return response()->json([
                'message' => 'Product quantity updated in cart',
                'item' => $existingItem,
                
            ], status: 409);
        } else if (!$existingItem) {
            $item = CartItem::create([
                'client_id' => $cart->client_id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'color' => $request->color,
            ]);

            return response()->json([
                'message' => 'Product added to cart',
                'item' => $item
            ], status:201);
        } else {
            return response()->json([
                'message' => 'There is an error while adding the product to your cart',
            ], status:404);
        }
    }

    // Update quantity or color of a cart item
    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'color' => 'sometimes|string|max:255',
        ]);

        $item = CartItem::findOrFail($itemId);

        if ($request->has('quantity')) {
            $item->quantity = $request->quantity;
        }
        if ($request->has('color')) {
            $item->color = $request->color;
        }
        $item->save();

        return response()->json(['message' => 'Cart item updated', 'item' => $item]);
    }

    // Remove a cart item
    public function remove($itemId)
    {
        $item = CartItem::findOrFail($itemId);
        $item->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}
