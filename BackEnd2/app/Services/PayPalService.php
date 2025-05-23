<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PayPalService
{
    protected $clientId;
    protected $clientSecret;
    protected $mode;
    protected $baseUrl;

    public function __construct()
    {
        $this->clientId = config('paypal.client_id');
        $this->clientSecret = config('paypal.secret');
        $this->mode = config('paypal.mode', 'sandbox');
        $this->baseUrl = $this->mode === 'sandbox' 
            ? 'https://api-m.sandbox.paypal.com'
            : 'https://api-m.paypal.com';

        if (!$this->clientId || !$this->clientSecret) {
            throw new \Exception('PayPal credentials are not configured properly.');
        }
    }

    protected function getAccessToken()
    {
        $response = Http::withBasicAuth($this->clientId, $this->clientSecret)
            ->asForm()
            ->post($this->baseUrl . '/v1/oauth2/token', [
                'grant_type' => 'client_credentials'
            ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to get PayPal access token');
        }

        return $response->json('access_token');
    }

    public function createOrder($amount)
    {
        $accessToken = $this->getAccessToken();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Content-Type' => 'application/json'
        ])->post($this->baseUrl . '/v2/checkout/orders', [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'USD',
                        'value' => number_format($amount, 2, '.', '')
                    ]
                ]
            ]
        ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to create PayPal order');
        }

        return $response->json();
    }

    public function captureOrder($orderId)
    {
        $accessToken = $this->getAccessToken();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Content-Type' => 'application/json'
        ])->post($this->baseUrl . '/v2/checkout/orders/' . $orderId . '/capture');

        if (!$response->successful()) {
            throw new \Exception('Failed to capture PayPal order');
        }

        return $response->json();
    }

    public function verifyEmail($email)
{
    // Very basic simulated check (like your frontend demo logic)
    return str_ends_with($email, '@paypal.com');
}
}
