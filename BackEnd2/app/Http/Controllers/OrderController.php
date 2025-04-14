<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

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
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:waiting,delivered,returned',
            'total_amount' => 'required|numeric|min:0',
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
            'status' => 'sometimes|required|in:waiting,delivered,returned',
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
        return response()->json(['message' => 'Order deleted successfully']);
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
} 