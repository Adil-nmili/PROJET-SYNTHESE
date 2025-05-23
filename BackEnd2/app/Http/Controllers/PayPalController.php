<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PayPalService;

class PayPalController extends Controller
{
    protected $paypal;

    public function __construct(PayPalService $paypal)
    {
        $this->paypal = $paypal;
    }

    public function createOrder(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        $order = $this->paypal->createOrder($request->amount);
        return response()->json($order);
    }

    public function captureOrder(Request $request)
    {
        $request->validate([
            'orderID' => 'required|string'
        ]);

        $capture = $this->paypal->captureOrder($request->orderID);
        return response()->json($capture);
    }

    public function verifyEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email'
            ]);

            $isVerified = $this->paypal->verifyEmail($request->email);

            if ($isVerified) {
                return response()->json(['verified' => true]);
            }

            return response()->json([
                'verified' => false,
                'message' => 'Email not associated with a PayPal account'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'verified' => false,
                'message' => 'Failed to verify PayPal email: ' . $e->getMessage()
            ], 500);
        }
    }
}
