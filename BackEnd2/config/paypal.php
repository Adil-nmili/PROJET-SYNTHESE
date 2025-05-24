<?php

return [
    'client_id' => env('PAYPAL_CLIENT_ID'),
    'secret' => env('PAYPAL_CLIENT_SECRET'),
    'mode' => env('PAYPAL_MODE', 'sandbox'), // 'sandbox' or 'live'

    // Automatically switch base_url based on mode
    'base_url' => env('PAYPAL_MODE') === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com',
];
