<?php

namespace App\Http\Controllers;

use App\Models\ShippingAddress;
use App\Models\Order;
use Illuminate\Http\Request;

class ShippingAddressController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'full_name' => 'required|string|max:255',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $shippingAddress = ShippingAddress::create($validatedData);
        return response()->json($shippingAddress, 201);
    }

    public function show($orderId)
    {
        $shippingAddress = ShippingAddress::where('order_id', $orderId)->first();
        if (!$shippingAddress) {
            return response()->json(['message' => 'Shipping address not found'], 404);
        }
        return response()->json($shippingAddress);
    }

    public function update(Request $request, $orderId)
    {
        $shippingAddress = ShippingAddress::where('order_id', $orderId)->first();
        if (!$shippingAddress) {
            return response()->json(['message' => 'Shipping address not found'], 404);
        }

        $validatedData = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'address_line1' => 'sometimes|required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'sometimes|required|string|max:20',
            'country' => 'sometimes|required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $shippingAddress->update($validatedData);
        return response()->json($shippingAddress);
    }
} 